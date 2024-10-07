import express from "express";
import {
    getAllFrizbees,
    getFrizbeeById,
    createFrizbee,
    updateFrizbee,
    deleteFrizbee,
} from "../controllers/frizbeeController";

const router = express.Router();

// Routes pour les opérations CRUD sur FRIZBEE
router.get("/", getAllFrizbees);
router.get("/:id", getFrizbeeById);
router.post("/", createFrizbee);
router.put("/:id", updateFrizbee);
router.delete("/:id", deleteFrizbee);

export default router;
