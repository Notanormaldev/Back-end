"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenCodeSessionTracer = void 0;
// import type { Event, FilePart, Message, Model, Part } from "@opencode-ai/sdk";
const run_trees_js_1 = require("../../run_trees.cjs");
const index_js_1 = require("../../index.cjs");
const dedupeParts = (parts) => {
    const partById = {};
    for (const part of parts) {
        partById[part.id] = { ...partById[part.id], ...part };
    }
    return Object.values(partById);
};
const convertToStandardContentBlock = (part) => {
    // Ignore AI SDK specific parts
    if (part.type === "step-start" || part.type === "step-finish") {
        return [];
    }
    if (part.type === "text") {
        return {
            type: "text",
            text: part.text,
            extras: part.metadata,
        };
    }
    if (part.type === "reasoning") {
        return {
            type: "thinking",
            thinking: part.text,
        };
    }
    if (part.type === "file") {
        return {
            type: "file",
            id: part.filename ?? part.id,
            url: part.url,
            mime_type: part.mime,
        };
    }
    if (part.type === "tool") {
        return {
            type: "tool_use",
            name: part.tool,
            input: part.state.input,
            id: part.callID,
        };
    }
    if (part.type === "compaction") {
        return {
            type: "compaction",
            data: { auto: part.auto },
        };
    }
    return {
        type: "non_standard",
        value: part,
    };
};
const convertToStandardMessages = (messages) => {
    return messages.flatMap((message) => {
        const parts = dedupeParts(message.parts);
        if (message.info?.role === "assistant") {
            // split out into "model message"
            return [
                {
                    role: "assistant",
                    content: parts.flatMap(convertToStandardContentBlock),
                },
                ...parts.flatMap((part) => {
                    if (part.type !== "tool")
                        return [];
                    if (part.state.status === "completed") {
                        return {
                            role: "tool",
                            content: part.state.output,
                            name: part.tool,
                            id: part.id,
                            tool_call_id: part.callID,
                        };
                    }
                    if (part.state.status === "error") {
                        return {
                            role: "tool",
                            content: part.state.error,
                            name: part.tool,
                            id: part.id,
                            tool_call_id: part.callID,
                        };
                    }
                    return [];
                }),
            ];
        }
        if (message.info?.role === "user") {
            return {
                role: "user",
                content: parts.flatMap(convertToStandardContentBlock),
            };
        }
        return [];
    });
};
class OpenCodeSessionTracer {
    constructor(inputConfig) {
        Object.defineProperty(this, "sessions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.inputConfig = inputConfig ?? {};
        this.client = inputConfig?.client ?? new index_js_1.Client();
    }
    getSession(sessionID) {
        this.sessions[sessionID] ??= {
            messages: {},
            traces: {},
            history: undefined,
            pendingSystem: undefined,
            postRunQueue: [],
            parentID: undefined,
        };
        return this.sessions[sessionID];
    }
    getMessage(sessionID, messageID) {
        const session = this.getSession(sessionID);
        session.messages[messageID] ??= {
            info: undefined,
            parts: [],
            complete: false,
            system: undefined,
        };
        // Attach pending system to assistant messages
        if (session.pendingSystem != null &&
            session.messages[messageID]?.info?.role === "assistant") {
            session.messages[messageID].system = session.pendingSystem;
            session.pendingSystem = undefined;
        }
        return session.messages[messageID];
    }
    getProviderMetadata(run) {
        const info = run.info;
        if (!info || info.role !== "assistant")
            return {};
        const model = run.system?.model;
        const modelId = model?.id ?? info.modelID;
        const providerId = model?.providerID ?? info.providerID;
        const ls_invocation_params = {
            model: modelId,
            providerID: providerId,
        };
        if (model?.name)
            ls_invocation_params.model_display_name = model.name;
        if (model?.api?.id)
            ls_invocation_params.api_model_id = model.api.id;
        if (model?.api?.url)
            ls_invocation_params.api_url = model.api.url;
        if (model?.api?.npm)
            ls_invocation_params.api_npm_package = model.api.npm;
        const stepFinish = run.parts.find((part) => part.type === "step-finish");
        return {
            ls_model_name: modelId,
            ls_provider: providerId,
            ls_model_type: "chat",
            ls_invocation_params,
            usage_metadata: stepFinish
                ? {
                    input_tokens: stepFinish.tokens.input,
                    output_tokens: stepFinish.tokens.output + stepFinish.tokens.reasoning,
                    total_tokens: stepFinish.tokens.input +
                        stepFinish.tokens.output +
                        stepFinish.tokens.reasoning,
                    input_token_details: {
                        cache_read: stepFinish.tokens.cache.read,
                        cache_creation: stepFinish.tokens.cache.write,
                    },
                }
                : undefined,
        };
    }
    async sendTrace(sessionID, runs, options) {
        const session = this.getSession(sessionID);
        const userRunIdx = runs.findIndex(({ info }) => info?.role === "user");
        const userRun = runs.at(userRunIdx);
        const agentRuns = runs.slice(userRunIdx + 1);
        if (userRunIdx === -1 || userRun == null)
            return;
        const parentStartTime = userRun?.info?.time?.created ?? Date.now();
        const parentEndTime = agentRuns
            .flatMap((run) => run.parts)
            .reduce((acc, part) => {
            if (!("time" in part) || part.time == null)
                return acc;
            if (!("end" in part.time) || typeof part.time.end !== "number")
                return acc;
            return Math.max(acc, part.time.end);
        }, parentStartTime);
        if (userRun?.info) {
            session.history ??= [];
            session.history.push({ info: userRun.info, parts: userRun.parts });
        }
        const parentConfig = {
            name: "opencode.session",
            run_type: "chain",
            start_time: parentStartTime,
            end_time: parentEndTime,
            extra: {
                metadata: {
                    ls_integration: "opencode-js",
                    ls_agent_type: "root",
                    thread_id: sessionID,
                },
            },
            inputs: { messages: convertToStandardMessages([userRun]) },
            outputs: { messages: convertToStandardMessages(agentRuns) },
            ...this.inputConfig,
            client: this.client,
        };
        const parent = options?.parentRunTree?.createChild(parentConfig) ??
            new run_trees_js_1.RunTree(parentConfig);
        session.postRunQueue.push(parent.postRun());
        for (const run of agentRuns) {
            const startTime = run.info?.time?.created ?? Date.now();
            const endTime = run.parts.reduce((acc, part) => {
                if (!("time" in part) || part.time == null)
                    return acc;
                if (!("end" in part.time) || typeof part.time.end !== "number")
                    return acc;
                return Math.max(acc, part.time.end);
            }, startTime);
            const parts = dedupeParts(run.parts);
            // Create child runs for tool parts
            const child = parent.createChild({
                name: "opencode.assistant.turn",
                run_type: "llm",
                start_time: startTime,
                end_time: endTime,
                inputs: {
                    messages: [
                        ...(run.system?.system
                            ? [{ role: "system", content: run.system.system.join("\n") }]
                            : []),
                        ...convertToStandardMessages(session.history ?? []),
                    ],
                },
                outputs: { messages: convertToStandardMessages([run]) },
                extra: { metadata: this.getProviderMetadata(run) },
            });
            session.postRunQueue.push(child.postRun());
            for (const toolPart of parts) {
                if (toolPart.type !== "tool")
                    continue;
                const state = toolPart.state;
                // Try looking for subgraph
                let toolHandled = false;
                if (state.metadata?.sessionId) {
                    const session = this.getSession(state.metadata.sessionId);
                    for (const trace of Object.values(session.traces)) {
                        if (trace.state !== "subgraph")
                            continue;
                        await this.sendTrace(state.metadata.sessionId, trace.runs, {
                            parentRunTree: child,
                        });
                        toolHandled = true;
                    }
                }
                if (toolHandled)
                    continue;
                const tool = child.createChild({
                    name: toolPart.tool,
                    run_type: "tool",
                    inputs: state.input ?? {},
                    outputs: {
                        output: state.output,
                        attachments: state.attachments?.map(convertToStandardContentBlock) ??
                            undefined,
                    },
                    start_time: state.time?.start ?? startTime,
                    end_time: state.time?.end ?? endTime,
                    error: state.error,
                    extra: { metadata: state.metadata },
                });
                session.postRunQueue.push(tool.postRun());
            }
            if (run.info) {
                session.history ??= [];
                session.history.push({ info: run.info, parts });
            }
        }
    }
    async flush() {
        await Promise.all(Object.values(this.sessions).flatMap((session) => session.postRunQueue));
        await this.client.flush();
        await this.client.awaitPendingTraceBatches();
    }
    async handleSystem(input, output) {
        if (!input.sessionID)
            return;
        const session = this.getSession(input.sessionID);
        session.pendingSystem = { model: input.model, system: output.system };
    }
    async handleSessionLoad(sessionID, history) {
        const session = this.getSession(sessionID);
        if (session.history)
            return;
        session.history = await history(sessionID);
    }
    async handleEvent({ event: { properties, type } }) {
        if (type === "server.instance.disposed") {
            await this.flush();
            return;
        }
        const sessionID = "sessionID" in properties && typeof properties.sessionID === "string"
            ? properties.sessionID
            : undefined;
        if (!sessionID)
            return;
        const session = this.getSession(sessionID);
        let updatedID;
        if (type === "session.created" || type === "session.updated") {
            session.parentID = properties.info.parentID;
        }
        if (type === "message.updated") {
            const message = this.getMessage(sessionID, properties.info.id);
            message.info = properties.info;
            updatedID = properties.info.id;
        }
        if (type === "message.part.updated") {
            const message = this.getMessage(sessionID, properties.part.messageID);
            message.parts.push(properties.part);
            updatedID = properties.part.messageID;
        }
        if (type === "message.part.removed") {
            const message = this.getMessage(sessionID, properties.messageID);
            message.parts = message.parts.filter((part) => part.id !== properties.partID);
            updatedID = properties.messageID;
        }
        if (type === "message.removed") {
            const session = this.getSession(sessionID);
            delete session.messages[properties.messageID];
        }
        // Message consolidation logic
        const message = updatedID ? session.messages[updatedID] : undefined;
        if (message?.info?.role == null)
            return;
        // Skip if message is already marked as complete
        if (message.complete)
            return;
        message.complete =
            (message.info?.role === "user" && message.parts.length > 0) ||
                (message.info?.role === "assistant" &&
                    message.parts.some((part) => part.type === "step-finish"));
        // Now we're complete, add to a trace
        if (message.complete) {
            const traceId = message.info.role === "user" ? message.info.id : message.info.parentID;
            session.traces[traceId] ??= { runs: [], state: false };
            const trace = session.traces[traceId];
            trace.runs.push(message);
            // Skip if trace is already marked as complete
            if (trace.state !== false)
                return;
            trace.state = trace.runs.some((run) => run.parts.some(
            // trace is marked complete when there's a step-finish part with reason "stop"
            (part) => part.type === "step-finish" && part.reason === "stop"));
            if (trace.state) {
                // If trace is part of a subagent call, mark it as a subgraph and submit
                // when parent is being submitted (to preserve correct dotted order)
                if (session.parentID) {
                    trace.state = "subgraph";
                    return;
                }
                await this.sendTrace(sessionID, trace.runs);
            }
        }
    }
}
exports.OpenCodeSessionTracer = OpenCodeSessionTracer;
