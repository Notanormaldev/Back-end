import { PDFParse } from "pdf-parse";
import fs from 'fs';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { configDotenv } from "dotenv";
configDotenv()

let databuffer = fs.readFileSync('./story.pdf');


const parser= new PDFParse({data:databuffer});
const data= await parser.getText()
// console.log(data);//get pdf data using parser


const splitter = new RecursiveCharacterTextSplitter(
    {chunkSize:500,
        chunkOverlap:0
    }
)

const chunks = await splitter.splitText(data.text)
// console.log(chunks);



const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
  apiKey:process.env.MISTRAL_API_KEY

});

const vectors =await embeddings.embedDocuments(chunks)
console.log(vectors);







