import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';



export const generateEnv = async(fullPath) => {
    await createEnv(fullPath);
    await createEnvExample(fullPath);
}



const createEnv = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath);
    
    // File
    const filePath = path.join(folderPath, '.env');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
PORT=8080
DB_HOST=localhost
DB_DATABASE=node_test
DB_USER=root
DB_PASSWORD=123456
SECRETORPRIVATEKEY=Est03sMyPub1cK3y23@
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createEnvExample = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath,);
    
    // File
    const filePath = path.join(folderPath, '.env.example');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
PORT=8080
DB_HOST=localhost
DB_DATABASE=example
DB_USER=root
DB_PASSWORD=123456
SECRETORPRIVATEKEY=ABC1234
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}