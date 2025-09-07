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
