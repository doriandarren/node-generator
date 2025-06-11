import fs from 'fs';
import path from 'path';
import { createFolder, runExec } from '../../../helpers/helperFile.js';



export const generateMulter = async(fullPath) => {
    await installMulter(fullPath);
    await createFormParser(fullPath);
}



/**
 * Multer
 * @param {*} fullPath 
 */
const installMulter = async(fullPath) => {
  console.log(`📦 Instalando dependencias Multer`);
  const cmd = `npm install multer`;
  await runExec(cmd, fullPath);
}




const createFormParser = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'middlewares');
    
    // File
    const filePath = path.join(folderPath, 'formParser.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import multer from 'multer';

const storage = multer.memoryStorage(); // o usa diskStorage si prefieres guardar en disco

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB límite
});

// Solo campos de texto (sin archivos)
export const formParser = upload.none();

// Los siguientes son ejemplos para implementar en el controlador.

// Un solo archivo (campo: archivo). Ejemplo pero mejor implementar en el controlador. 
// export const formParserWithFile = upload.single('file');

// Varios archivos con el mismo campo (campo: fotos). Ejemplo pero mejor implementar en el controlador. 
// export const formParserWithPhotos = upload.array('picture', 5);

// Archivos en múltiples campos. Ejemplo pero mejor implementar en el controlador. 
// export const formParserMultipleFields = upload.fields([
//   { name: 'picture', maxCount: 1 },
//   { name: 'document', maxCount: 1 }
// ]);
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}
