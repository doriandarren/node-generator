import { response, request } from 'express';
import { AbilityRepository } from '../../../repositories/abilities/abilityRepository.js';


const repository = new AbilityRepository();

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const abilityStoreController = async(req, res = response) => {
    
    try {

        const data = await repository.store(dataNew);

        return res.handler.respondWithData(data, 'ability created');
        
    } catch (error) {
        console.error('❌ Error en userListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
