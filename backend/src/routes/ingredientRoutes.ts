import express from "express";
import {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient,
} from "../controllers/ingredientController";

const router = express.Router();

// Routes pour les opérations CRUD sur INGREDIENT
router.get("/", getAllIngredients);
router.get("/:id", getIngredientById);
router.post("/", createIngredient);
router.put("/:id", updateIngredient);
router.delete("/:id", deleteIngredient);

export default router;
