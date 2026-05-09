import { PDFParse } from "pdf-parse";
import fs from 'fs';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from '@pinecone-database/pinecone';
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { configDotenv } from "dotenv";
import { log } from "console";
configDotenv();

// let databuffer = fs.readFileSync('./story.pdf');


// const parser= new PDFParse({data:databuffer});
// const data= await parser.getText()
// // console.log(data);//get pdf data using parser


// const splitter = new RecursiveCharacterTextSplitter(
//     {chunkSize:500,
//         chunkOverlap:0
//     }
// )

// const chunks = await splitter.splitText(data.text)
// console.log(chunks);



const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
  apiKey:process.env.MISTRAL_API_KEY

});

// const vectors =await Promise.all(chunks.map(async(chunk)=>{
//     const embed = await embeddings.embedQuery(chunk);
//    return{
//         text:chunk,
//         embed
//    }
// }))
// console.log(vectors);

const pc = new Pinecone({
  apiKey:process.env.PINECONE
});


const index = pc.index('cohort-2-rag')



// const result = await index.upsert({
//     records:vectors.map((vec,i)=>({
//          id:`vec-${i}`,
//          values:vec.embed,
//          metadata:{
//             text:vec.text
//          }
//     }))
// })


const queryembed =await embeddings.embedQuery('how was the internship experience')

// console.log(queryembed);


const result =await index.query({
  vector:queryembed,
  topK:2,
  includeMetadata:true
})
console.log(JSON.stringify(result));

