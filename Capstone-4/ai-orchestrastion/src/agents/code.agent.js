import { ChatMistralAI } from "@langchain/mistralai"
import { createReactAgent } from "@langchain/langgraph/prebuilt"
import { createTools } from "./tool.js"
import { INKZ_SYSTEM_PROMPT } from "./prompt.js"


const model = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})


// Returns a new agent instance bound to a specific sandboxId
export function createAgent(sandboxId) {
    const { listfiles, readfile, updatefile, createFile } = createTools(sandboxId)

    return createReactAgent({
        llm: model,
        tools: [listfiles, readfile, updatefile, createFile],
        stateModifier: INKZ_SYSTEM_PROMPT
    })
}