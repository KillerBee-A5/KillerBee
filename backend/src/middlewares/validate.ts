import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateRequest = (
    schema: Joi.ObjectSchema<any>,
    property: "body" | "query" | "params" = "body"
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req[property], { abortEarly: false });
        if (error) {
            const errorDetails = error.details.map((detail) => detail.message);
            res.status(400).json({ errors: errorDetails });
            return;
        }
        next();
    };
};
