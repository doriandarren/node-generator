import { response, request } from 'express';
import { RoleRepository } from '../../../repositories/roles/roleRepository.js';


const repository = new RoleRepository();

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const roleStoreController = async(req, res = response) => {
    
    try {

        const data = await repository.store(dataNew);

        return res.handler.respondWithData(data, 'role created');
        
    } catch (error) {
        console.error('❌ Error en userListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
