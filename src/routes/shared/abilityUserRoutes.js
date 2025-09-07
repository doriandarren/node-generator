import { Router } from "express";
import { check, param } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { checkIdExists } from "../../helpers/validators/checkIdExists.js";
import { validateJWT } from "../../middlewares/validateJWT.js";
import AbilityUser from "../../models/AbilityUser.js";
import { abilityUserListController } from "../../controllers/shared/ability_users/abilityUserListController.js";
import { abilityUserShowController } from "../../controllers/shared/ability_users/abilityUserShowController.js";
import { abilityUserStoreController } from "../../controllers/shared/ability_users/abilityUserStoreController.js";
import { abilityUserUpdateController } from "../../controllers/shared/ability_users/abilityUserUpdateController.js";
import { abilityUserDeleteController } from "../../controllers/shared/ability_users/abilityUserDeleteController.js";


const router = Router();


/**
 * List
 */
router.get('/list', [
    validateJWT,
], abilityUserListController);


/**
 * Show
 */
router.get('/show/:id', [
    validateJWT,
    //check('name', 'El name es obligatorio').not().isEmpty(),
    param('id').custom( checkIdExists(AbilityUser) ),
    validateFields
], abilityUserShowController);

/**
 * Store
 */
router.post('/store', [
    validateJWT,
], abilityUserStoreController);

/**
 * Update
 */
router.put('/update/:id', [
    validateJWT,
    param('id').custom( checkIdExists(AbilityUser) ),
    validateFields
], abilityUserUpdateController);

/**
 * Delete
 */ 
router.delete('/delete/:id', [
    validateJWT,
    param('id').custom( checkIdExists(AbilityUser) ),
    validateFields
], abilityUserDeleteController);


export default router;    
