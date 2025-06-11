
import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateControllerAuth = async(fullPath) => {
    await createAuthLoginController(fullPath);

}


const createAuthLoginController = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'controllers', 'api', 'auth');
    
    // File
    const filePath = path.join(folderPath, 'authLoginController.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { response } from "express";
import bcrypt from 'bcryptjs';
import User from "../../../models/User.js";
import { generateJWT } from "../../../helpers/jwt/generateJWT.js";
import { MessageChannel } from "../../../helpers/messages/MessageChannel.js";


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const authLoginController = async(req, res = response) => {

    await MessageChannel.send('Prueba', 'Prueba Login', true);
    
    const { email, password } = req.body; 

    try {

        const user = await User.findOne({ where: { email } });

        if(!user){
            return res.handler.respondHttpBadRequest('Usuario / Password no son correctos - email');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if( !validPassword ){
            return res.handler.respondHttpBadRequest('Usuario / Password no son correctos - password');
        }

        const token = await generateJWT(user.id);

        const r = { token, user, };

        res.handler.respondWithData('Login OK', r);
        
    } catch (error) {
        res.handler.respondHttpInternalError('Error. Contacte con el Administador');
    }

}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


