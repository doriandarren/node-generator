import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';
import { convertNameProject } from '../../../helpers/helperString.js';



export const generateEnv = async(fullPath, projectName) => {

    const projectNameNew = convertNameProject(projectName);

    await createEnv(fullPath, projectNameNew);
    await createEnvExample(fullPath, projectNameNew);
}



const createEnv = async(fullPath, projectName) => {    

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
DB_DATABASE=${projectName}_api
DB_USER=root
DB_PASSWORD=123456
SECRETORPRIVATEKEY=Est03sMyPub1cK3y23@
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createEnvExample = async(fullPath, projectName) => {    

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
DB_DATABASE=${projectName}_api
DB_USER=root
DB_PASSWORD=123456
SECRETORPRIVATEKEY=ABC1234
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}