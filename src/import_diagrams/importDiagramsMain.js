import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';


export const importDiagramsMain = async() => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', '');
    
    // File
    const filePath = path.join(folderPath, '');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}