import 'dotenv/config'
import readline from 'readline/promises';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from 'langchain';

const model = new ChatGoogleGenerativeAI({
  model:"gemini-2.5-flash-lite",
  apiKey:process.env.GOOGLE_API_KEY
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const message = []
while(true){
    const userInput =await rl.question('you:')

    message.push(new HumanMessage(userInput))

    const res = await model.invoke(message)
    message.push(res)
    console.log("AI:"+ res.content);

}


