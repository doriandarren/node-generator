import { response, request } from 'express';
import { UserStatusRepository } from '../../../repositories/user_statuses/userStatusRepository.js';


const repository = new UserStatusRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const userStatusListController = async(req = request, res = response) => {

    try {
        const data = await repository.list();
        return res.handler.respondWithData('UserStatus list', data);

    } catch (error) {
        console.error('❌ Error en userStatusListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}    
