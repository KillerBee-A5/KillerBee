import { Router } from "express";
import {
    getAllFrizbees,
    getFrizbeeById,
    createFrizbee,
    updateFrizbee,
    deleteFrizbee,
} from "../controllers/frizbeeController";

const router = Router();

router.get("/", getAllFrizbees);
router.get("/:id", getFrizbeeById);
router.post("/", createFrizbee);
router.put("/:id", updateFrizbee);
router.delete("/:id", deleteFrizbee);

export default router;
