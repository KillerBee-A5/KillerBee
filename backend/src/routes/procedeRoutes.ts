import express from "express";
import {
    getAllProceedes,
    getProceedById,
    createProceed,
    updateProceed,
    deleteProceed,
} from "../controllers/procedeController";

const router = express.Router();

// Routes pour les opérations CRUD sur PROCEDE
router.get("/", getAllProceedes);
router.get("/:id", getProceedById);
router.post("/", createProceed);
router.put("/:id", updateProceed);
router.delete("/:id", deleteProceed);

export default router;
