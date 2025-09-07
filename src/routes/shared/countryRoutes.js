import { Router } from "express";
import { check, param } from "express-validator";
import { validateFields } from "../../middlewares/validateFields.js";
import { checkIdExists } from "../../helpers/validators/checkIdExists.js";
import { validateJWT } from "../../middlewares/validateJWT.js";
import Country from "../../models/Country.js";
import { countryListController } from "../../controllers/shared/countries/countryListController.js";
import { countryShowController } from "../../controllers/shared/countries/countryShowController.js";
import { countryStoreController } from "../../controllers/shared/countries/countryStoreController.js";
import { countryUpdateController } from "../../controllers/shared/countries/countryUpdateController.js";
import { countryDeleteController } from "../../controllers/shared/countries/countryDeleteController.js";


const router = Router();


/**
 * List
 */
router.get('/list', [
    validateJWT,
], countryListController);


/**
 * Show
 */
router.get('/show/:id', [
    validateJWT,
    //check('name', 'El name es obligatorio').not().isEmpty(),
    param('id').custom( checkIdExists(Country) ),
    validateFields
], countryShowController);

/**
 * Store
 */
router.post('/store', [
    validateJWT,
], countryStoreController);

/**
 * Update
 */
router.put('/update/:id', [
    validateJWT,
    param('id').custom( checkIdExists(Country) ),
    validateFields
], countryUpdateController);

/**
 * Delete
 */ 
router.delete('/delete/:id', [
    validateJWT,
    param('id').custom( checkIdExists(Country) ),
    validateFields
], countryDeleteController);


export default router;    
