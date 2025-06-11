import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateApp = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath);
    
    // File
    const filePath = path.join(folderPath, 'app.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
//import 'dotenv/config';
import { Server } from './src/server/server.js';
import dotenv from 'dotenv';
import './src/models/initAssociations.js';


dotenv.config();

const server = new Server();

server.listen();
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}