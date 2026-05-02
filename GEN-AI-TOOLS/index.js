import 'dotenv/config'
import readline from 'readline/promises'
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent, HumanMessage } from 'langchain';
import * as z from "zod"
import { tool } from "langchain"
import { sendEmail } from './mail.service.js';



const emailtool = tool(
   sendEmail,
   {
      name:'emailtool',
      description:"use for the sending email",
      schema:z.object({
            to:z.string().describe('to email address'),
            subject:z.string().describe('email subject'),
            html:z.string().describe('html content of the email'),
            text:z.string().describe('text content of the email').optional()
      })
   }
)




const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey:process.env.GEMINI_API
});
const agnent = new createAgent({
   model,
   tools:[emailtool]
})



const rl= readline.createInterface({
    input:process.stdin,
    output:process.stdout
})




const msg=[];



while(true){

   const userinput = await rl.question("YOU:")

   msg.push(new HumanMessage(userinput))

   const res =await agnent.invoke(
    {
      messages:msg
    }
   )
   msg.push(res.messages[res.messages.length-1].content)
   
   console.log("AI:",res);
  
}

