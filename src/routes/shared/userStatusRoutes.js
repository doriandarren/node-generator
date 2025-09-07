import { Router } from "express";
import { check, param } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { checkIdExists } from "../../helpers/validators/checkIdExists.js";
import { validateJWT } from "../../middlewares/validateJWT.js";
import UserStatus from "../../models/UserStatus.js";
import { userStatusListController } from "../../controllers/shared/user_statuses/userStatusListController.js";
import { userStatusShowController } from "../../controllers/shared/user_statuses/userStatusShowController.js";
import { userStatusStoreController } from "../../controllers/shared/user_statuses/userStatusStoreController.js";
import { userStatusUpdateController } from "../../controllers/shared/user_statuses/userStatusUpdateController.js";
import { userStatusDeleteController } from "../../controllers/shared/user_statuses/userStatusDeleteController.js";


const router = Router();


/**
 * List
 */
router.get('/list', [
    validateJWT,
], userStatusListController);


/**
 * Show
 */
router.get('/show/:id', [
    validateJWT,
    //check('name', 'El name es obligatorio').not().isEmpty(),
    param('id').custom( checkIdExists(UserStatus) ),
    validateFields
], userStatusShowController);

/**
 * Store
 */
router.post('/store', [
    validateJWT,
], userStatusStoreController);

/**
 * Update
 */
router.put('/update/:id', [
    validateJWT,
    param('id').custom( checkIdExists(UserStatus) ),
    validateFields
], userStatusUpdateController);

/**
 * Delete
 */ 
router.delete('/delete/:id', [
    validateJWT,
    param('id').custom( checkIdExists(UserStatus) ),
    validateFields
], userStatusDeleteController);


export default router;    
