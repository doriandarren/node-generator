import { Router } from "express";
import { check, param } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { checkIdExists } from "../../helpers/validators/checkIdExists.js";
import { validateJWT } from "../../middlewares/validateJWT.js";
import User from "../../models/User.js";
import { userListController } from "../../controllers/api/users/userListController.js";
import { userShowController } from "../../controllers/api/users/userShowController.js";
import { userStoreController } from "../../controllers/api/users/userStoreController.js";
import { userUpdateController } from "../../controllers/api/users/userUpdateController.js";
import { userDeleteController } from "../../controllers/api/users/userDeleteController.js";


const router = Router();


/**
 * List
 */
router.get('/list', [
    validateJWT,
], userListController);


/**
 * Show
 */
router.get('/show/:id', [
    validateJWT,
    //check('name', 'El name es obligatorio').not().isEmpty(),
    param('id').custom( checkIdExists(User) ),
    validateFields
], userShowController);

/**
 * Store
 */
router.post('/store', [
    validateJWT,
], userStoreController);

/**
 * Update
 */
router.put('/update/:id', [
    validateJWT,
    param('id').custom( checkIdExists(User) ),
    validateFields
], userUpdateController);

/**
 * Delete
 */ 
router.delete('/delete/:id', [
    validateJWT,
    param('id').custom( checkIdExists(User) ),
    validateFields
], userDeleteController);


export default router;    
