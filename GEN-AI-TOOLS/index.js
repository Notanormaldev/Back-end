import 'dotenv/config'
import readline from 'readline/promises'
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from 'langchain';
import nodemailer from 'nodemailer';
import * as z from "zod"
import { tool } from "langchain"


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});



transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

async function sendEmail({to,html,subject,text=''}){
   const emailoption={
      from:process.env.USER,
      to,
      subject,
      html,
      text
   }

   const dts = await model.sendmail(emailoption)
   console.log("Send email",dts);

   return ("email sent sucesfully to:"+ to)
   

}


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

   const userinput = await rl.question("YOU:")

   msg.push(new HumanMessage(userinput))

   const res =await model.invoke(msg)
   msg.push(res)
   
   console.log("AI:",res.content);
  
}

