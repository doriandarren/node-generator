import { response, request } from 'express';
import { AbilityUserRepository } from '../../../repositories/ability_users/abilityUserRepository.js';


const repository = new AbilityUserRepository();

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const abilityUserStoreController = async(req, res = response) => {
    
    try {

        const data = await repository.store(dataNew);

        return res.handler.respondWithData(data, 'abilityUser created');
        
    } catch (error) {
        console.error('❌ Error en userListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
