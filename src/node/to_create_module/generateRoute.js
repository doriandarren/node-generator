import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';


export const generateRoute = async(fullPath, namespace, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, singularNameCase, pluralNameCase, columns) => {    
    

    //console.log(fullPath);

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
import { ${singularNameCase}ListController } from "../../controllers/${namespace}/${pluralNameCase}/${singularNameCase}ListController.js";
import { ${singularNameCase}ShowController } from "../../controllers/${namespace}/${pluralNameCase}/${singularNameCase}ShowController.js";
import { ${singularNameCase}StoreController } from "../../controllers/${namespace}/${pluralNameCase}/${singularNameCase}StoreController.js";
import { ${singularNameCase}UpdateController } from "../../controllers/${namespace}/${pluralNameCase}/${singularNameCase}UpdateController.js";
import { ${singularNameCase}DeleteController } from "../../controllers/${namespace}/${pluralNameCase}/${singularNameCase}DeleteController.js";


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



