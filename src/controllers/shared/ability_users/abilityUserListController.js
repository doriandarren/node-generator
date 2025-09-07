import { response, request } from 'express';
import { AbilityUserRepository } from '../../../repositories/ability_users/abilityUserRepository.js';


const repository = new AbilityUserRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const abilityUserListController = async(req = request, res = response) => {

    try {
        const data = await repository.list();
        return res.handler.respondWithData('AbilityUser list', data);

    } catch (error) {
        console.error('❌ Error en abilityUserListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}    
