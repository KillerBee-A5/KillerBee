import Joi from "joi";
import { FRIZBEE } from "../models/FRIZBEE";

// Schéma pour créer un FRIZBEE (sans ID_FRIZBEE)
export const createFrizbeeSchema = Joi.object<Omit<FRIZBEE, "ID_FRIZBEE">>({
    NOM_FRIZBEE: Joi.string().min(3).max(100).required(),
    DESCRIPTION_FRIZBEE: Joi.string().max(500).optional(),
    PUHT: Joi.number().positive().required(),
    STOCK: Joi.number().integer().min(0).required(),
    ID_PROCEDE: Joi.number().integer().required(),
    ID_GAMME: Joi.number().integer().required(),
    ORDRE: Joi.number().integer().min(1).required(),
});

// Schéma pour mettre à jour un FRIZBEE (tout facultatif sauf ID_FRIZBEE)
export const updateFrizbeeSchema = Joi.object<
    Partial<Omit<FRIZBEE, "ID_FRIZBEE">>
>({
    NOM_FRIZBEE: Joi.string().min(3).max(100).optional(),
    DESCRIPTION_FRIZBEE: Joi.string().max(500).optional(),
    PUHT: Joi.number().positive().optional(),
    STOCK: Joi.number().integer().min(0).optional(),
    ID_PROCEDE: Joi.number().integer().optional(),
    ID_GAMME: Joi.number().integer().optional(),
    ORDRE: Joi.number().integer().min(1).optional(),
}).min(1);
