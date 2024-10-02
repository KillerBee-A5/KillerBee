import { Router } from "express";
import {
    getAllComposer,
    createComposer,
    deleteComposer,
} from "../controllers/composerController";

const router = Router();

router.get("/", getAllComposer);
router.post("/", createComposer);
router.delete("/", deleteComposer);

export default router;
