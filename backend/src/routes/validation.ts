import Joi from "joi";

export const FRIZBEESchema = Joi.object({
    NOM_FRIZBEE: Joi.string().min(1).max(255).required(),
    DESCRIPTION_FRIZBEE: Joi.string().min(1).max(1000).required(),
    PUHT: Joi.number().positive().required(),
    STOCK: Joi.number().integer().min(0).required(),
    ID_PROCEDE: Joi.number().integer().required(),
    ID_GAMME: Joi.number().integer().required(),
    ORDRE: Joi.number().integer().required(),
});
