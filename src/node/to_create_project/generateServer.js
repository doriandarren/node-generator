import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';


export const generateServer = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'server');
    
    // File
    const filePath = path.join(folderPath, 'server.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}