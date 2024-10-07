// src/controllers/procedeController.ts
import { Request, Response, NextFunction } from "express";
import { ProceedService } from "../services/procedeService";

const proceedService = new ProceedService();

/**
 * Récupère tous les PROCEDE.
 */
export const getAllProceedes = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const proceedes = await proceedService.getAll();
        res.json(proceedes);
    } catch (err) {
        next(err);
    }
};

/**
 * Récupère un PROCEDE par ID_PROCEDE.
 */
export const getProceedById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const procede = await proceedService.getById(id);
        if (!procede) {
            res.status(404).json({ message: "Proceed not found" });
        } else {
            res.json(procede);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * Crée un nouveau PROCEDE.
 */
export const createProceed = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newProceed = await proceedService.create(req.body);
        res.status(201).json(newProceed);
    } catch (err) {
        next(err);
    }
};

/**
 * Met à jour un PROCEDE existant.
 */
export const updateProceed = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const updatedProceed = await proceedService.update(id, req.body);
        if (!updatedProceed) {
            res.status(404).json({ message: "Proceed not found" });
        } else {
            res.json(updatedProceed);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * Supprime un PROCEDE par ID_PROCEDE.
 */
export const deleteProceed = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const deletedProceed = await proceedService.delete(id);
        if (!deletedProceed) {
            res.status(404).json({ message: "Proceed not found" });
        } else {
            res.json({
                message: "Proceed deleted successfully",
                procede: deletedProceed,
            });
        }
    } catch (err) {
        next(err);
    }
};
