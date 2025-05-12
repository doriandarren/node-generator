import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';


export const generateControllerUpdate = async(
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
    const filePath = path.join(folderPath, `${singularNameCamel}UpdateController.js`);

    // Asegurar que la carpeta exista
    createFolder(folderPath);



    // Construir destructuring y asignación dinámica
    const destructuredFields = columns.map(col => col.name).join(',\n        ');


    const assignments = columns.map(col => 
      `if (${col.name} !== undefined) dataToUpdate.${col.name} = ${col.name};`
    ).join('\n    ');



    // Code
    const code = `
import { response } from "express";
import { ${singularName}Repository } from '../../../repositories/${pluralNameSnake}/${singularNameCamel}Repository.js';


const repository = new ${singularName}Repository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const ${singularNameCamel}UpdateController = async(req, res = response) => {

    const { id } = req.params;

    const { 
       ${destructuredFields}
    } = req.body;

    const dataToUpdate = {};

    ${assignments}

    try {
        const data = await repository.update(id, dataToUpdate);
        return res.handler.respondWithData('${singularName} list', data);

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