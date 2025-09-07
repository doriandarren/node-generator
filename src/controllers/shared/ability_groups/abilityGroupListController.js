import { response, request } from 'express';
import { AbilityGroupRepository } from '../../../repositories/ability_groups/abilityGroupRepository.js';


const repository = new AbilityGroupRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const abilityGroupListController = async(req = request, res = response) => {

    try {
        const data = await repository.list();
        return res.handler.respondWithData('AbilityGroup list', data);

    } catch (error) {
        console.error('❌ Error en abilityGroupListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}    
