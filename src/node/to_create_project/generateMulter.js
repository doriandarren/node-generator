import fs from 'fs';
import path from 'path';
import { createFolder, runExec } from '../../helpers/helperFile.js';



export const generateMulter = async(fullPath) => {
    await installMulter(fullPath);
    await createMiddlewareFile(fullPath);
}



/**
 * Multer
 * @param {*} fullPath 
 */
const installMulter = async(fullPath) => {
  console.log(`📦 Instalando dependencias Express`);
  const cmd = `npm install multer`;
  await runExec(cmd, fullPath);
}




/**
 * File
 * @param {*} fullPath 
 */
const createMiddlewareFile = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'middlewares');
    
    // File
    const filePath = path.join(folderPath, 'uploads.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
// middlewares/upload.js
import multer from 'multer';

const upload = multer();

export default upload;
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}