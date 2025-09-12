import { response } from "express";

export const openAIController = async(req, res = response) => {

    

    return res.json({
        msg: 'API - openAI'
    });
}