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
import { validateFields } from "../middlewares/validate-fields.js";
import { checkIdExists } from "../../helpers/validators/checkIdExists.js";
import ${singularName} from "../../models/${singularName}.js";
import { validateJWT } from "../../middlewares/validateJWT.js";
import { ${singularNameCase}ListController } from "../../controllers/${namespace}/${pluralNameCase}/${singularNameCase}ListController.js";
import { ${singularNameCase}ShowController } from "../../controllers/${namespace}/${pluralNameCase}/${singularNameCase}ShowController.js";
import { ${singularNameCase}StoreController } from "../../controllers/${namespace}/${pluralNameCase}/${singularNameCase}StoreController.js";
import { ${singularNameCase}UpdateController } from "../../controllers/${namespace}/${pluralNameCase}/${singularNameCase}UpdateController.js";
import { ${singularNameCase}DeleteController } from "../../controllers/${namespace}/${pluralNameCase}/${singularNameCase}DeleteController.js";


const router = Router();


/**
 * List
 */
router.get('/', [
    validateJWT,
], abilityListController);


/**
 * Show
 */
router.get('/:id', [
    validateJWT,
    check('name', 'El name es obligatorio').not().isEmpty(),
    param('id').custom( checkIdExists(Ability) ),
    validateFields
], abilityShowController);

/**
 * Store
 */
router.post('/', [
    validateJWT,
], abilityStoreController);

/**
 * Update
 */
router.put('/:id', [
    validateJWT,
], abilityUpdateController);

/**
 * Delete
 */ 
router.delete('/:id', [
    validateJWT,
], abilityDeleteController);


export default router;    
`.trimStart();



    console.log("filePath resuelto:", filePath);
    console.log("dirname(filePath):", path.dirname(filePath));
    console.log("fs.existsSync(dirname):", fs.existsSync(path.dirname(filePath)));

    try {
        fs.writeFileSync(filePath, code);
        console.log(`✅ Archivo creado: ${filePath}`.green);
    } catch (error) {
        console.error(`❌ Error al crear archivo: ${error.message}`);
    }

}



