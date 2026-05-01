import readline from 'readline';

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question("what is your name:",(name)=>{
    console.log(`hello ${name}!`);
    rl.close()
})



const res= await model.invoke("hello")

console.log(res.text);
