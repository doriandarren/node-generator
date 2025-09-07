import { response, request } from 'express';
import { UserRepository } from '../../../repositories/users/userRepository.js';


const repository = new UserRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const userListController = async(req = request, res = response) => {

    try {
        const data = await repository.list();
        return res.handler.respondWithData('User list', data);

    } catch (error) {
        console.error('❌ Error en userListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}    
