import express from "express";
import {
    getAllComposers,
    getComposerById,
    createComposer,
    updateComposer,
    deleteComposer,
} from "../controllers/composerController";

const router = express.Router();

// Routes pour les opérations CRUD sur COMPOSER
router.get("/", getAllComposers);
router.get("/:id", getComposerById);
router.post("/", createComposer);
router.put("/:id", updateComposer);
router.delete("/:id", deleteComposer);

export default router;
