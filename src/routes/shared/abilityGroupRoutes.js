import { Router } from "express";
import { check, param } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { checkIdExists } from "../../helpers/validators/checkIdExists.js";
import { validateJWT } from "../../middlewares/validateJWT.js";
import AbilityGroup from "../../models/AbilityGroup.js";
import { abilityGroupListController } from "../../controllers/shared/ability_groups/abilityGroupListController.js";
import { abilityGroupShowController } from "../../controllers/shared/ability_groups/abilityGroupShowController.js";
import { abilityGroupStoreController } from "../../controllers/shared/ability_groups/abilityGroupStoreController.js";
import { abilityGroupUpdateController } from "../../controllers/shared/ability_groups/abilityGroupUpdateController.js";
import { abilityGroupDeleteController } from "../../controllers/shared/ability_groups/abilityGroupDeleteController.js";


const router = Router();


/**
 * List
 */
router.get('/list', [
    validateJWT,
], abilityGroupListController);


/**
 * Show
 */
router.get('/show/:id', [
    validateJWT,
    //check('name', 'El name es obligatorio').not().isEmpty(),
    param('id').custom( checkIdExists(AbilityGroup) ),
    validateFields
], abilityGroupShowController);

/**
 * Store
 */
router.post('/store', [
    validateJWT,
], abilityGroupStoreController);

/**
 * Update
 */
router.put('/update/:id', [
    validateJWT,
    param('id').custom( checkIdExists(AbilityGroup) ),
    validateFields
], abilityGroupUpdateController);

/**
 * Delete
 */ 
router.delete('/delete/:id', [
    validateJWT,
    param('id').custom( checkIdExists(AbilityGroup) ),
    validateFields
], abilityGroupDeleteController);


export default router;    
