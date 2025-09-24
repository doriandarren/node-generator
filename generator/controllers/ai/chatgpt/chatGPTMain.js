import 'dotenv/config';
import fs from 'fs';
import path from 'path';
//import { createFolder } from '../../../helpers/helperFile.js';
import OpenAI from "openai";



export const chatGPTMain = async() => {    


    const client = new OpenAI({
        apiKey: process.env.API_KEY_OPEN_AI
    });


    
    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: "Hola, ¿cómo estás?",
    });

    console.log(response.output_text);


}


chatGPTMain();
