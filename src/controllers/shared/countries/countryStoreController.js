import { response, request } from 'express';
import { CountryRepository } from '../../../repositories/countries/countryRepository.js';


const repository = new CountryRepository();

/**
 * @param {import('express').Request} req
 * @param {import('express').Response & { handler: import('../../../helpers/controllers/baseController.js').BaseController }} res
 */
export const countryStoreController = async(req, res = response) => {
    
    try {

        const data = await repository.store(dataNew);

        return res.handler.respondWithData(data, 'country created');
        
    } catch (error) {
        console.error('❌ Error en userListController:', error);
        return res.handler.respondHttpInternalError(error.message);
    }

}
