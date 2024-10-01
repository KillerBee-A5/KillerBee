import { Router, Request, Response, NextFunction } from "express";
import { FRIZBEEService } from "../services/FRIZBEEService";
import { ConnectionPool } from "mssql";
import { validateRequest } from "../middlewares/validate";
import {
    createFrizbeeSchema,
    updateFrizbeeSchema,
} from "../validators/FRIZBEEValidator";

const router = Router();

// Middleware pour injecter les services
router.use((req: Request, res: Response, next: NextFunction) => {
    const pool: ConnectionPool = req.app.get("db");
    req.app.set("frizbeeService", new FRIZBEEService(pool));
    next();
});

// Routes pour FRIZBEE

// GET /api/frizbee - Récupérer tous les FRIZBEE
router.get(
    "/frizbee",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const frizbeeService: FRIZBEEService =
                req.app.get("frizbeeService");
            const frizbees = await frizbeeService.getAllFRIZBEE();
            res.json(frizbees);
        } catch (error) {
            next(error);
        }
    }
);

// GET /api/frizbee/:id - Récupérer un FRIZBEE par ID
router.get(
    "/frizbee/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const frizbeeService: FRIZBEEService =
                req.app.get("frizbeeService");
            const id = parseInt(req.params.id, 10);
            const frizbee = await frizbeeService.getFRIZBEEById(id);
            if (frizbee) {
                res.json(frizbee);
            } else {
                res.status(404).json({ message: "FRIZBEE non trouvé" });
            }
        } catch (error) {
            next(error);
        }
    }
);

// POST /api/frizbee - Créer un nouveau FRIZBEE
router.post(
    "/frizbee",
    validateRequest(createFrizbeeSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const frizbeeService: FRIZBEEService =
                req.app.get("frizbeeService");
            const newFrizbee = await frizbeeService.createFRIZBEE(req.body);
            res.status(201).json(newFrizbee);
        } catch (error) {
            next(error);
        }
    }
);

// PUT /api/frizbee/:id - Mettre à jour un FRIZBEE
router.put(
    "/frizbee/:id",
    validateRequest(updateFrizbeeSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const frizbeeService: FRIZBEEService =
                req.app.get("frizbeeService");
            const id = parseInt(req.params.id, 10);
            const updatedFrizbee = await frizbeeService.updateFRIZBEE(
                id,
                req.body
            );
            if (updatedFrizbee) {
                res.json(updatedFrizbee);
            } else {
                res.status(404).json({ message: "FRIZBEE non trouvé" });
            }
        } catch (error) {
            next(error);
        }
    }
);

// DELETE /api/frizbee/:id - Supprimer un FRIZBEE
router.delete(
    "/frizbee/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const frizbeeService: FRIZBEEService =
                req.app.get("frizbeeService");
            const id = parseInt(req.params.id, 10);
            const success = await frizbeeService.deleteFRIZBEE(id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: "FRIZBEE non trouvé" });
            }
        } catch (error) {
            next(error);
        }
    }
);

export default router;
