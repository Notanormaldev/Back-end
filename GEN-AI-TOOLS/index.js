import 'dotenv/config'
import readline from 'readline/promises'
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from 'langchain';

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey:process.env.GEMINI_API
});



const rl= readline.createInterface({
    input:process.stdin,
    output:process.stdout
})




const msg=[];



while(true){

//    const userinput = await rl.question("YOU:")

//    msg.push(new HumanMessage(userinput))

   const res =await model.invoke("who is you??")
//    msg.push(res)
   
   console.log("AI:",res.content);
  
}

