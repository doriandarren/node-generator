import { response, request } from 'express';
import { RoleUserRepository } from '../../../repositories/role_users/roleUserRepository.js';


const repository = new RoleUserRepository();

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const roleUserStoreController = async(req, res = response) => {
    
    try {

        const data = await repository.store(dataNew);

        return res.handler.respondWithData(data, 'roleUser created');
        
    } catch (error) {
        console.error('❌ Error en userListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
