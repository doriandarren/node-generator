import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';



export const generateRoutes = async(fullPath) => {
    
    await createAuth(fullPath);

}



export const createAuth = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'routes', 'api');
    
    // File
    const filePath = path.join(folderPath, 'authRoutes.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { Router } from "express";
import { authLoginController } from "../../controllers/auth/authLoginController.js";


const router = Router();


router.post('/login', authLoginController);



export default router;
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}