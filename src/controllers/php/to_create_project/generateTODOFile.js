import fs from 'fs';
import path from 'path';
//import { createFolder } from '../../../helpers/helperFile.js';


export const generateTODOFile = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath);
    
    // File
    const filePath = path.join(folderPath, 'todo.md');

    // Asegurar que la carpeta exista
    //createFolder(folderPath);


    // Code
    const code = `
 ## Utils
 
 - ${fullPath} ## Ruta
 

 ## TODO list

`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}