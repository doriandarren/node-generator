import { Router } from "express";
//import { check } from "express-validator";
//import { validateFields } from "../middlewares/validate-fields.js";
import { devController } from "../../controllers/dev/devController.js";


const router = Router();

/**
 * Dev
 */
router.get('/',  devController);


export default router;    
