import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';


export const generateControllerShow = async(
  fullPath,
  namespace,
  singularName,
  pluralName,
  singularNameKebab,
  pluralNameKebab,
  singularNameSnake,
  pluralNameSnake,
  singularNameCamel,
  pluralNameCamel,
  columns
) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', '');
    
    // File
    const filePath = path.join(folderPath, '');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { response } from "express";
import { ${singularName}Repository } from "../../../repositories/${pluralNameSnake}/${singularNameCamel}Repository.js";



const repository = new ${singularName}Repository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const ${singularNameCamel}ShowController = async(req, res = response) => {
    
    const { id } = req.params;

    try {
        const data = await repository.show(id);

        return res.handler.respondWithData('${singularName} show', data);

    } catch (error) {
        console.error('❌ Error en ${singularNameCamel}ListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}   
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}