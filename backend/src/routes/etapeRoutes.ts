import { Router } from "express";
import {
    getAllEtapes,
    getEtapeById,
    createEtape,
    updateEtape,
    deleteEtape,
} from "../controllers/etapeController";

const router = Router();

router.get("/", getAllEtapes);
router.get("/:id", getEtapeById);
router.post("/", createEtape);
router.put("/:id", updateEtape);
router.delete("/:id", deleteEtape);

export default router;
