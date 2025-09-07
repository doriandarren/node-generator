import { response } from "express";
import { CountryRepository } from '../../../repositories/countries/countryRepository.js';


const repository = new CountryRepository();


/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const countryUpdateController = async(req, res = response) => {

    const { id } = req.params;

    const { 
       common_name,
        iso_name,
        code_alpha_2,
        code_alpha_3,
        numerical_code,
        phone_code
    } = req.body;

    const dataToUpdate = {};

    if (common_name !== undefined) dataToUpdate.common_name = common_name;
    if (iso_name !== undefined) dataToUpdate.iso_name = iso_name;
    if (code_alpha_2 !== undefined) dataToUpdate.code_alpha_2 = code_alpha_2;
    if (code_alpha_3 !== undefined) dataToUpdate.code_alpha_3 = code_alpha_3;
    if (numerical_code !== undefined) dataToUpdate.numerical_code = numerical_code;
    if (phone_code !== undefined) dataToUpdate.phone_code = phone_code;

    try {
        const data = await repository.update(id, dataToUpdate);
        return res.handler.respondWithData('Country list', data);

    } catch (error) {
        console.error('❌ Error en countryListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
