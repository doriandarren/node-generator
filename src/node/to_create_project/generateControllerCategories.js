
import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';


export const generateControllerCategories = async(fullPath) => {
    await createCategoryListController(fullPath);
    
}






const createCategoryListController = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'controllers', 'api', 'categories');
    
    // File
    const filePath = path.join(folderPath, 'categoryListController.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { response } from "express";

export const categoryListController = async(req, res = response) => {
    return res.json({
        msg: 'API- List Category'
    });
}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}