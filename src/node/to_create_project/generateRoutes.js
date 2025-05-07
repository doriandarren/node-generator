import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';



export const generateRoutes = async(fullPath) => {
    
    // Shared



    // API
    await createAuth(fullPath);
    await createCategory(fullPath);
    await createItem(fullPath);
    await createUser(fullPath);

}




export const createAuth = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'routes', 'api');
    
    // File
    const filePath = path.join(folderPath, 'authRoutes.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { Router } from "express";
import { authLoginController } from "../../controllers/auth/authLoginController.js";


const router = Router();


router.post('/login', authLoginController);



export default router;
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


export const createCategory = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'routes', 'api');
    
    // File
    const filePath = path.join(folderPath, 'categoryRoutes.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { Router } from "express";
import { categoryListController } from "../../controllers/api/categories/categoryListController.js";


const router = Router();

router.get('/', categoryListController);


export default router;
    
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


export const createItem = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'routes', 'api');
    
    // File
    const filePath = path.join(folderPath, 'itemRoutes.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { Router } from "express";
import { itemListController } from "../../controllers/api/items/itemListController.js";



const router = Router();


router.get('/', itemListController);


export default router;
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


export const createUser = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'routes', 'api');
    
    // File
    const filePath = path.join(folderPath, 'userRoutes.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { Router } from 'express';
import { body, check, param } from 'express-validator';
import { userListController } from '../../controllers/api/users/userListController.js';
import { userShowController } from '../../controllers/api/users/userShowController.js';
import { userStoreController } from '../../controllers/api/users/userStoreController.js';
import { userUpdateController } from '../../controllers/api/users/userUpdateController.js';
import { userDeleteController } from '../../controllers/api/users/userDeleteController.js';
import { formParser } from '../../middlewares/formParser.js';
import { validateJWT } from '../../middlewares/validateJWT.js';
import { validateFields } from '../../middlewares/validateFields.js';
import { checkIdExists } from '../../helpers/validators/checkIdExists.js';
import User from '../../models/User.js';
import UserStatus from '../../models/UserStatus.js';



const router = Router();

// List
router.get('/', [ validateJWT ], userListController);

// Show
router.get('/:id', [
    validateJWT,
    param('id').isInt().withMessage('The field ID must be an integer'),
    param('id').custom( checkIdExists(User) ),
    validateFields,
], userShowController);


// Store
router.post('/', [ 
    validateJWT,
    formParser, 
    check('user_status_id').isInt().withMessage('The user_status_id must be an integer').custom( checkIdExists(UserStatus) ),
    check('name').notEmpty().withMessage('The field name is required'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('The field password must be at least 6 characters long'),
    validateFields,
], userStoreController);


// Update
router.put('/:id', [ 
    validateJWT,
    formParser, 

     // Validate :id param
    param('id')
        .isInt().withMessage('User ID must be an integer')
        .custom(checkIdExists(User)),

    body('name')
        .optional()
        .notEmpty().withMessage('Name cannot be empty'),

    body('email')
        .optional()
        .isEmail().withMessage('Invalid email address'),

    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('user_status_id')
        .optional()
        .isInt().withMessage('user_status_id must be an integer')
        .custom(checkIdExists(UserStatus)),

    validateFields,
], userUpdateController);




// Delete
router.delete('/:id',[ 
    validateJWT,
    formParser,
    param('id')
        .isInt().withMessage('User ID must be an integer')
        .custom(checkIdExists(User)),

], userDeleteController);


export default router;
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}