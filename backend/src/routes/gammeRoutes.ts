import express from "express";
import {
    getAllGammes,
    getGammeById,
    createGamme,
    updateGamme,
    deleteGamme,
} from "../controllers/gammeController";

const router = express.Router();

// Routes pour les opérations CRUD sur GAMME
router.get("/", getAllGammes);
router.get("/:id", getGammeById);
router.post("/", createGamme);
router.put("/:id", updateGamme);
router.delete("/:id", deleteGamme);

export default router;
