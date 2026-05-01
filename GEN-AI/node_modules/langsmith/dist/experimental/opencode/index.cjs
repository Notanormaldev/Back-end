"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangSmithPlugin = void 0;
// import type { Plugin } from "@opencode-ai/plugin";
const tracer_js_1 = require("./tracer.cjs");
const LangSmithPlugin = async (ctx) => {
    const tracer = new tracer_js_1.OpenCodeSessionTracer();
    async function getSessionHistory(sessionID) {
        const past = await ctx.client.session.messages({
            path: { id: sessionID },
        });
        if (past.error)
            throw past.error;
        return past.data;
    }
    return {
        "experimental.chat.system.transform": async (input, output) => {
            const sessionID = input.sessionID;
            if (!sessionID)
                return;
            await tracer.handleSessionLoad(sessionID, getSessionHistory);
            await tracer.handleSystem(input, output);
        },
        event: async (input) => {
            const sessionID = "sessionID" in input.event.properties &&
                typeof input.event.properties.sessionID === "string"
                ? input.event.properties.sessionID
                : undefined;
            if (!sessionID)
                return;
            await tracer.handleSessionLoad(sessionID, getSessionHistory);
            await tracer.handleEvent(input);
        },
    };
};
exports.LangSmithPlugin = LangSmithPlugin;
