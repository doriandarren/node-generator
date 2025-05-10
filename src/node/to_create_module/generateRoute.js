import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';


export const generateRoute = async(nameProject, projectPath, singularName, pluralName, singularNameKebab, pluralNameKebab, singularNameSnake, pluralNameSnake, columns) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'routes', 'api');
    
    // File countryRoutes
    const filePath = path.join(folderPath, `${singularName}Routes.js`);  // agendaUpdalodRoutes

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";

const router = Router();

/**
 * List
 */
router.get('/', [], countryListController);

/**
 * Show
 */
router.get('/:id', [
    check('name', 'El name es obligatorio').not().isEmpty(),
    validateFields
], countryShowController);

/**
 * Store
 */
router.post('/', [], countryStoreController);

/**
 * Update
 */
router.put('/:id', [], countryUpdateController);

/**
 * Delete
 */ 
router.delete('/:id', [], countryDeleteController);


export default router;    
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}