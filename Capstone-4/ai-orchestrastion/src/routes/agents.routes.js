import { Router } from "express";
import { createAgent } from "../agents/code.agent.js";

const agentrouter = Router()


agentrouter.post('/invoke', async (req, res) => {
    try {
        const { message, sandboxId, sandboxid } = req.body
        const sid = sandboxId || sandboxid

        if (!message) {
            return res.status(400).json({ error: "message is required" })
        }
        if (!sid) {
            return res.status(400).json({ error: "sandboxId is required" })
        }

        const agent = createAgent(sid)

        const response = await agent.invoke(
            {
                messages: [{
                    role: "user",
                    content: message
                }]
            },
            { recursionLimit: 50 }
        )

        // Return only the last AI message content
        const messages = response.messages
        const lastAiMessage = [...messages].reverse().find(m => m._getType?.() === "ai" || m.role === "assistant")

        res.json({
            response: lastAiMessage?.content ?? response
        })

    } catch (error) {
        console.error("error invoking the agent", error)
        res.status(500).json({
            error: error.message ?? "Agent invocation failed"
        })
    }
})


export default agentrouter