import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';




export const generateControllerItems = async(fullPath) => {  
    
    await createItemListController(fullPath);


}


const createItemListController = async(fullPath) => {  
    
    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'controllers', 'api', 'items');
    
    // File
    const filePath = path.join(folderPath, 'itemListController.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { response } from "express";


export const itemListController = async(req, res = response) => {
    
    // return res.json({
    //     msg: 'API List ITem',
    //     success: true,
    // });


    const data = await Item.find();

    return res.handler.respondWithData(data, 'API List ITem');



}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}