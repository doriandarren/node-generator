import { Router } from "express";
import { check, param } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { checkIdExists } from "../../helpers/validators/checkIdExists.js";
import { validateJWT } from "../../middlewares/validateJWT.js";
import RoleUser from "../../models/RoleUser.js";
import { roleUserListController } from "../../controllers/shared/role_users/roleUserListController.js";
import { roleUserShowController } from "../../controllers/shared/role_users/roleUserShowController.js";
import { roleUserStoreController } from "../../controllers/shared/role_users/roleUserStoreController.js";
import { roleUserUpdateController } from "../../controllers/shared/role_users/roleUserUpdateController.js";
import { roleUserDeleteController } from "../../controllers/shared/role_users/roleUserDeleteController.js";


const router = Router();


/**
 * List
 */
router.get('/list', [
    validateJWT,
], roleUserListController);


/**
 * Show
 */
router.get('/show/:id', [
    validateJWT,
    //check('name', 'El name es obligatorio').not().isEmpty(),
    param('id').custom( checkIdExists(RoleUser) ),
    validateFields
], roleUserShowController);

/**
 * Store
 */
router.post('/store', [
    validateJWT,
], roleUserStoreController);

/**
 * Update
 */
router.put('/update/:id', [
    validateJWT,
    param('id').custom( checkIdExists(RoleUser) ),
    validateFields
], roleUserUpdateController);

/**
 * Delete
 */ 
router.delete('/delete/:id', [
    validateJWT,
    param('id').custom( checkIdExists(RoleUser) ),
    validateFields
], roleUserDeleteController);


export default router;    
