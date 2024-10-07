// src/controllers/ingredientController.ts
import { Request, Response, NextFunction } from "express";
import { IngredientService } from "../services/ingredientService";

const ingredientService = new IngredientService();

/**
 * Récupère tous les INGREDIENT.
 */
export const getAllIngredients = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const ingredients = await ingredientService.getAll();
        res.json(ingredients);
    } catch (err) {
        next(err);
    }
};

/**
 * Récupère un INGREDIENT par ID_INGREDIENT.
 */
export const getIngredientById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const ingredient = await ingredientService.getById(id);
        if (!ingredient) {
            res.status(404).json({ message: "Ingredient not found" });
        } else {
            res.json(ingredient);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * Crée un nouvel INGREDIENT.
 */
export const createIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newIngredient = await ingredientService.create(req.body);
        res.status(201).json(newIngredient);
    } catch (err) {
        next(err);
    }
};

/**
 * Met à jour un INGREDIENT existant.
 */
export const updateIngredient = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const updatedIngredient = await ingredientService.update(id, req.body);
        if (!updatedIngredient) {
            res.status(404).json({ message: "Ingredient not found" });
        } else {
            res.json(updatedIngredient);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * Supprime un INGREDIENT par ID_INGREDIENT.
 */
export const deleteIngredient = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const deletedIngredient = await ingredientService.delete(id);
        if (!deletedIngredient) {
            res.status(404).json({ message: "Ingredient not found" });
        } else {
            res.json({
                message: "Ingredient deleted successfully",
                ingredient: deletedIngredient,
            });
        }
    } catch (err) {
        next(err);
    }
};
