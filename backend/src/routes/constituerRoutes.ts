import { Router } from "express";
import {
    getAllConstituer,
    createConstituer,
    deleteConstituer,
} from "../controllers/constituerController";

const router = Router();

router.get("/", getAllConstituer);
router.post("/", createConstituer);
router.delete("/", deleteConstituer);

export default router;
