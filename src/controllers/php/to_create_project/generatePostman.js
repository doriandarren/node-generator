
import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';




export const generatePostman = async(fullPath) => {    

  // Carpeta destino
  const folderPath = path.join(fullPath, 'public', 'Scripts');
  createFolder(folderPath);

  // Archivos fuente
  const sourceBase = path.join(process.cwd(), 'public', 'postman');
  const sourcePng = path.join(sourceBase, 'API.postman_collection.json');

  // Archivos destino
  const destPng = path.join(folderPath, 'API.postman_collection.json');


  try {
    fs.copyFileSync(sourcePng, destPng);
    console.log(`✅ logo.png copiado a ${destPng}`.green);

  } catch (error) {
    console.error(`❌ Error: ${error.message}`.red);
  }

}