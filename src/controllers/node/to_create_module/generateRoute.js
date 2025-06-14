import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateRoute = async(
    fullPath, 
    namespace, 
    singularName, 
    pluralName, 
    singularNameKebab, 
    pluralNameKebab, 
    singularNameSnake, 
    pluralNameSnake, 
    singularNameCase, 
    pluralNameCase, 
    columns
) => {    
 
    await createFile(
        fullPath, 
        namespace, 
        singularName, 
        pluralName, 
        singularNameKebab, 
        pluralNameKebab, 
        singularNameSnake, 
        pluralNameSnake, 
        singularNameCase, 
        pluralNameCase, 
        columns
    );

    await updateServerJS(
        fullPath, 
        namespace, 
        singularName, 
        pluralName, 
        singularNameKebab, 
        pluralNameKebab, 
        singularNameSnake, 
        pluralNameSnake, 
        singularNameCase, 
        pluralNameCase, 
        columns
    );
    
}









const createFile = async(
    fullPath, 
    namespace, 
    singularName, 
    pluralName, 
    singularNameKebab, 
    pluralNameKebab, 
    singularNameSnake, 
    pluralNameSnake, 
    singularNameCase, 
    pluralNameCase, 
    columns
) => {   

    // Folder
    const folderPath = path.join(fullPath, 'src', 'routes', namespace);
    
    // File
    const filePath = path.join(folderPath, `${singularNameCase}Routes.js`); // abilityGroupRoutes.js

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { Router } from "express";
import { check, param } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { checkIdExists } from "../../helpers/validators/checkIdExists.js";
import { validateJWT } from "../../middlewares/validateJWT.js";
import ${singularName} from "../../models/${singularName}.js";
import { ${singularNameCase}ListController } from "../../controllers/${namespace}/${pluralNameSnake}/${singularNameCase}ListController.js";
import { ${singularNameCase}ShowController } from "../../controllers/${namespace}/${pluralNameSnake}/${singularNameCase}ShowController.js";
import { ${singularNameCase}StoreController } from "../../controllers/${namespace}/${pluralNameSnake}/${singularNameCase}StoreController.js";
import { ${singularNameCase}UpdateController } from "../../controllers/${namespace}/${pluralNameSnake}/${singularNameCase}UpdateController.js";
import { ${singularNameCase}DeleteController } from "../../controllers/${namespace}/${pluralNameSnake}/${singularNameCase}DeleteController.js";


const router = Router();


/**
 * List
 */
router.get('/list', [
    validateJWT,
], ${singularNameCase}ListController);


/**
 * Show
 */
router.get('/show/:id', [
    validateJWT,
    //check('name', 'El name es obligatorio').not().isEmpty(),
    param('id').custom( checkIdExists(${singularName}) ),
    validateFields
], ${singularNameCase}ShowController);

/**
 * Store
 */
router.post('/store', [
    validateJWT,
], ${singularNameCase}StoreController);

/**
 * Update
 */
router.put('/update/:id', [
    validateJWT,
    param('id').custom( checkIdExists(${singularName}) ),
    validateFields
], ${singularNameCase}UpdateController);

/**
 * Delete
 */ 
router.delete('/delete/:id', [
    validateJWT,
    param('id').custom( checkIdExists(${singularName}) ),
    validateFields
], ${singularNameCase}DeleteController);


export default router;    
`.trimStart();



    try {
        fs.writeFileSync(filePath, code);
        console.log(`✅ Archivo creado: ${filePath}`.green);
    } catch (error) {
        console.error(`❌ Error al crear archivo: ${error.message}`);
    }

}





const updateServerJS = async (
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
  const serverFilePath = path.join(fullPath, 'src', 'server', 'server.js');

  
  const routeName = `${singularNameCamel}Routes`;
  const importPath = `../routes/${namespace}/${singularNameCamel}Routes.js`;
  const apiPath = `/api/v1/${pluralNameKebab}`;

  const commentTag = '// System Write\n';

  try {
    let content = fs.readFileSync(serverFilePath, 'utf8');

    // 1. Agregar import
    if (!content.includes(`import ${routeName} from`)) {
      const importRegex = /import .* from .*;\n(?=import|$)/g;
      const lastImport = [...content.matchAll(importRegex)].pop();
      if (lastImport) {
        const index = lastImport.index + lastImport[0].length;
        content = content.slice(0, index) +
          `import ${routeName} from '${importPath}'; ${commentTag}` +
          content.slice(index);
      }
    }


    // 2. Agregar path
    // const pathKey = namespace.toLowerCase() === 'shared' ? 'pathShared' : 'pathApi';
    // const pathRegex = new RegExp(`this\\.${pathKey}\\s*=\\s*{([\\s\\S]*?)}`, 'm');
    // const matchPath = content.match(pathRegex);
    // if (matchPath && !matchPath[1].includes(pluralNameCamel)) {
    //   const insertIndex = matchPath.index + matchPath[0].lastIndexOf('}');
    //   const newLine = `            ${pluralNameCamel}: '${apiPath}', ${commentTag}`;
    //   content = content.slice(0, insertIndex) + newLine + content.slice(insertIndex);
    // }



    // 2. Agregar path
    const pathNamespace = `path${namespace.charAt(0).toUpperCase() + namespace.slice(1).toLowerCase()}`; // ejemplo: pathApi
    const pathKeyRegex = new RegExp(`this\\.${pathNamespace}\\s*=\\s*{([\\s\\S]*?)}`, 'm');
    const matchPath = content.match(pathKeyRegex);

    if (matchPath && !matchPath[1].includes(`${pluralNameCamel}:`)) {
        const fullMatch = matchPath[0]; // todo el bloque: this.pathApi = { ... }
        const insertPoint = fullMatch.indexOf('{') + 1; // posición después de {
        const insertLine = `\n            ${pluralNameCamel}: '${apiPath}', ${commentTag}`;
        const newFullMatch = fullMatch.slice(0, insertPoint) + insertLine + fullMatch.slice(insertPoint);

        content = content.replace(fullMatch, newFullMatch);
    }





    // 3. Agregar uso en `routes()`
    const appUseRegex = new RegExp(`this\\.app\\.use\\(\\s*this\\.${pathNamespace}\\.\\w+,\\s*\\w+Routes\\);`, 'g');
    const appUseMatches = [...content.matchAll(appUseRegex)];
    const alreadyIncluded = content.includes(`${pluralNameCamel}Routes`);

    if (appUseMatches.length > 0 && !alreadyIncluded) {
        const lastMatch = appUseMatches[appUseMatches.length - 1];
        const insertIndex = lastMatch.index + lastMatch[0].length;
        const newRouteLine = `\n        this.app.use( this.${pathNamespace}.${pluralNameCamel}, ${pluralNameCamel}Routes); ${commentTag}`;
        content = content.slice(0, insertIndex) + newRouteLine + content.slice(insertIndex);
    }


    // Guardar archivo
    fs.writeFileSync(serverFilePath, content);
    console.log(`✅ server.js actualizado correctamente`.green);
  } catch (err) {
    console.error(`❌ Error al actualizar server.js: ${err.message}`);
  }
};

