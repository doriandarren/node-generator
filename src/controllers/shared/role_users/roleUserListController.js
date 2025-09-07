import { response, request } from 'express';
import { RoleUserRepository } from '../../../repositories/role_users/roleUserRepository.js';


const repository = new RoleUserRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const roleUserListController = async(req = request, res = response) => {

    try {
        const data = await repository.list();
        return res.handler.respondWithData('RoleUser list', data);

    } catch (error) {
        console.error('❌ Error en roleUserListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}    
