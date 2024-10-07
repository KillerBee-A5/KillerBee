import express from "express";
import {
    getAllConstituers,
    getConstituerById,
    createConstituer,
    updateConstituer,
    deleteConstituer,
} from "../controllers/constituerController";

const router = express.Router();

// Routes pour les opérations CRUD sur CONSTITUER
router.get("/", getAllConstituers);
router.get("/:id", getConstituerById);
router.post("/", createConstituer);
router.put("/:id", updateConstituer);
router.delete("/:id", deleteConstituer);

export default router;
