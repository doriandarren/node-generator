import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateControllerStore = async(
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
    const folderPath = path.join(fullPath, 'src', 'controllers', namespace, pluralNameSnake);
    
    // File
    const filePath = path.join(folderPath, `${singularNameCamel}StoreController.js`);

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { response, request } from 'express';
import { ${singularName}Repository } from '../../../repositories/${pluralNameSnake}/${singularNameCamel}Repository.js';


const repository = new ${singularName}Repository();

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const ${singularNameCamel}StoreController = async(req, res = response) => {
    
    try {

        const data = await repository.store(dataNew);

        return res.handler.respondWithData(data, '${singularNameCamel} created');
        
    } catch (error) {
        console.error('❌ Error en userListController:', error);
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