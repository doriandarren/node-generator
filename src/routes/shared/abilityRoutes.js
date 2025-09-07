import { Router } from "express";
import { check, param } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { checkIdExists } from "../../helpers/validators/checkIdExists.js";
import { validateJWT } from "../../middlewares/validateJWT.js";
import Ability from "../../models/Ability.js";
import { abilityListController } from "../../controllers/shared/abilities/abilityListController.js";
import { abilityShowController } from "../../controllers/shared/abilities/abilityShowController.js";
import { abilityStoreController } from "../../controllers/shared/abilities/abilityStoreController.js";
import { abilityUpdateController } from "../../controllers/shared/abilities/abilityUpdateController.js";
import { abilityDeleteController } from "../../controllers/shared/abilities/abilityDeleteController.js";


const router = Router();


/**
 * List
 */
router.get('/list', [
    validateJWT,
], abilityListController);


/**
 * Show
 */
router.get('/show/:id', [
    validateJWT,
    //check('name', 'El name es obligatorio').not().isEmpty(),
    param('id').custom( checkIdExists(Ability) ),
    validateFields
], abilityShowController);

/**
 * Store
 */
router.post('/store', [
    validateJWT,
], abilityStoreController);

/**
 * Update
 */
router.put('/update/:id', [
    validateJWT,
    param('id').custom( checkIdExists(Ability) ),
    validateFields
], abilityUpdateController);

/**
 * Delete
 */ 
router.delete('/delete/:id', [
    validateJWT,
    param('id').custom( checkIdExists(Ability) ),
    validateFields
], abilityDeleteController);


export default router;    
