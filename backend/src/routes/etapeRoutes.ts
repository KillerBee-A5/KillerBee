import express from "express";
import {
    getAllEtapes,
    getEtapeById,
    createEtape,
    updateEtape,
    deleteEtape,
} from "../controllers/etapeController";

const router = express.Router();

// Routes pour les opérations CRUD sur ETAPE
router.get("/", getAllEtapes);
router.get("/:id", getEtapeById);
router.post("/", createEtape);
router.put("/:id", updateEtape);
router.delete("/:id", deleteEtape);

export default router;
