import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';




export const generateDev = async(fullPath) => {   

    await createRoute(fullPath);
    await createController(fullPath);

}




const createRoute = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'routes', 'dev');
    
    // File
    const filePath = path.join(folderPath, 'devRoutes.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { Router } from "express";
//import { check } from "express-validator";
//import { validateFields } from "../middlewares/validate-fields.js";
import { devController } from "../../controllers/dev/devController.js";


const router = Router();

/**
 * Dev
 */
router.get('/',  devController);


export default router;    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}



const createController = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'controllers', 'dev');
    
    // File
    const filePath = path.join(folderPath, 'devController.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { response } from "express";

export const devController = async(req, res = response) => {

    //TODO

    return res.json({
        msg: 'API - dev'
    });
}    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}