// src/middlewares/attachBaseController.js
import { BaseController } from "../helpers/controllers/baseController.js";


export const attachBaseController = (req, res, next) => {
    res.handler = new BaseController(res);
    next();
}
