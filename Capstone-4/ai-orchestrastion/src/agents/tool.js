import axios from "axios";
import { tool } from "@langchain/core/tools"
import z from "zod"


// Factory: creates tools bound to a specific sandboxId
export function createTools(sandboxId) {
    const BASE_URL = `http://sandbox-service-${sandboxId}:3000`

    const listfiles = tool(
        async ({}) => {
            console.log("===============");
            console.log("list file tool called for sandbox:", sandboxId);
            console.log("===============");
            const res = await axios.get(`${BASE_URL}/list-files`)
            console.log(res.data.elements);
            return JSON.stringify(res.data.elements)
        },
        {
            name: 'listfiles',
            description: 'list the files in the working directory, useful to understand project structure or location of files',
            schema: z.object({})
        }
    )

    const readfile = tool(
        async (input) => {
            console.log("===============");
            console.log("read file tool called with input:", input);
            console.log("===============");
            const files = input.files;
            try {
                const res = await axios.get(`${BASE_URL}/read-file?files=` + files.join(","))
                console.log(res.data.content);
                return JSON.stringify(res.data)
            } catch (error) {
                console.error("Error in readfile tool:", error.response ? error.response.data : error.message);
                return JSON.stringify({ error: error.response ? error.response.data : error.message, status: "error" });
            }
        },
        {
            name: 'readfile',
            description: 'read the content of files, pass an array of relative file paths',
            schema: z.object({
                files: z.array(z.string()).describe("array of relative file paths to read")
            })
        }
    )

    const updatefile = tool(
        async (input) => {
            console.log("===============");
            console.log("update file tool called with input:", input);
            console.log("===============");
            const updates = input.updates;
            try {
                const res = await axios.patch(`${BASE_URL}/update-files`, { updates })
                console.log(res.data);
                return JSON.stringify(res.data)
            } catch (error) {
                console.error("Error in updatefile tool:", error.response ? error.response.data : error.message);
                return JSON.stringify({ error: error.response ? error.response.data : error.message, status: "error" });
            }
        },
        {
            name: 'updatefile',
            description: 'update the content of existing files, provide array of {filename, content} objects with COMPLETE file content',
            schema: z.object({
                updates: z.array(z.object({
                    filename: z.string().describe("relative filename to update"),
                    content: z.string().describe("complete new content of the file")
                })).describe("array of files to update")
            })
        }
    )

    const createFile = tool(
        async (input) => {
            console.log("===============");
            console.log("create file tool called with input:", input);
            console.log("===============");
            const files = input.files;
            try {
                const res = await axios.post(`${BASE_URL}/create-files`, { files })
                console.log(res.data);
                return JSON.stringify(res.data)
            } catch (error) {
                console.error("Error in createFile tool:", error.response ? error.response.data : error.message);
                return JSON.stringify({ error: error.response ? error.response.data : error.message, status: "error" });
            }
        },
        {
            name: 'createFile',
            description: 'create new files in the working directory, folders are created automatically',
            schema: z.object({
                files: z.array(z.object({
                    filename: z.string().describe("relative filename to create"),
                    content: z.string().describe("content of the file")
                })).describe("array of files to create")
            })
        }
    )

    return { listfiles, readfile, updatefile, createFile }
}
