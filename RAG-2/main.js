import {PDFParse} from 'pdf-parse';
import  fs from 'fs';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { configDotenv } from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone';
configDotenv()

//pdf read buffer by fs
const databuffer=await fs.readFileSync('./story.pdf')
console.log(databuffer);


//pdf parse means we can se by pdf-parse
const parser=new PDFParse({data:databuffer})

const result =await parser.getText()

// console.log(result);



//splitter from langchain chunks me tod ta hai

const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 0 })
const chunks =await splitter.splitText(result.text)
// console.log(chunks);

//embebdding by mistral vector me conver

const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
  apiKey:process.env.MISTRAL_API_KEY
});


//for pinecone format we do text and vector from 

// const vectors = await Promise.all(chunks.map(async(chunk)=>{
//     const embed = await embeddings.embedQuery(chunk)
//     return{
//         text:chunk,
//         embed
//     }

// }))

// console.log(vectors);


//pinecone save data
const pc = new Pinecone({
    apiKey:process.env.PINECONE_API
})

const index = pc.index('rag-2')


// const results = await index.upsert({
//     records:vectors.map((vec,i)=>({
//         id:`vec-${i}`,
//         values:vec.embed,
//         metadata:{
//             text:vec.text
//         }
//     }))
// })



//que change into embed and search and result came
const queryembed = await embeddings.embedQuery("how was the internship?")

const res =await index.query({
    vector:queryembed,
    topK:2,
    includeMetadata:true
})

console.log(JSON.stringify(res));

