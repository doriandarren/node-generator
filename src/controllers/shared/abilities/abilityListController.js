import { response, request } from 'express';
import { AbilityRepository } from '../../../repositories/abilities/abilityRepository.js';


const repository = new AbilityRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const abilityListController = async(req = request, res = response) => {

    try {
        const data = await repository.list();
        return res.handler.respondWithData('Ability list', data);

    } catch (error) {
        console.error('❌ Error en abilityListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}    
