import { response } from "express";
import { AbilityRepository } from '../../../repositories/abilities/abilityRepository.js';


const repository = new AbilityRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const abilityUpdateController = async(req, res = response) => {

    const { id } = req.params;

    const { 
       name,
        label,
        ability_group_id
    } = req.body;

    const dataToUpdate = {};

    if (name !== undefined) dataToUpdate.name = name;
    if (label !== undefined) dataToUpdate.label = label;
    if (ability_group_id !== undefined) dataToUpdate.ability_group_id = ability_group_id;

    try {
        const data = await repository.update(id, dataToUpdate);
        return res.handler.respondWithData('Ability list', data);

    } catch (error) {
        console.error('❌ Error en abilityListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
