import { Router } from "express";
import {
    getAllGammes,
    getGammeById,
    createGamme,
    updateGamme,
    deleteGamme,
} from "../controllers/gammeController";

const router = Router();

router.get("/", getAllGammes);
router.get("/:id", getGammeById);
router.post("/", createGamme);
router.put("/:id", updateGamme);
router.delete("/:id", deleteGamme);

export default router;
