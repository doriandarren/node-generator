import { response, request } from 'express';
import { RoleRepository } from '../../../repositories/roles/roleRepository.js';


const repository = new RoleRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const roleListController = async(req = request, res = response) => {

    try {
        const data = await repository.list();
        return res.handler.respondWithData('Role list', data);

    } catch (error) {
        console.error('❌ Error en roleListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}    
