import readline from 'readline';

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: "your-api-key"
});




const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



``




rl.question("what is your name:",(name)=>{
    console.log(`hello ${name}!`);
    rl.close()
})