import { Router } from "express";
import {
    getAllProcedes,
    getProcedeById,
    createProcede,
    updateProcede,
    deleteProcede,
} from "../controllers/procedeController";

const router = Router();

router.get("/", getAllProcedes);
router.get("/:id", getProcedeById);
router.post("/", createProcede);
router.put("/:id", updateProcede);
router.delete("/:id", deleteProcede);

export default router;
