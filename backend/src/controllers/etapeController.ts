// src/controllers/etapeController.ts
import { Request, Response, NextFunction } from "express";
import { EtapeService } from "../services/etapeService";

const etapeService = new EtapeService();

/**
 * Récupère tous les ETAPE.
 */
export const getAllEtapes = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const etapes = await etapeService.getAll();
        res.json(etapes);
    } catch (err) {
        next(err);
    }
};

/**
 * Récupère un ETAPE par ID_ETAPE.
 */
export const getEtapeById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const etape = await etapeService.getById(id);
        if (!etape) {
            res.status(404).json({ message: "Etape not found" });
        } else {
            res.json(etape);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * Crée un nouveau ETAPE.
 */
export const createEtape = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newEtape = await etapeService.create(req.body);
        res.status(201).json(newEtape);
    } catch (err) {
        next(err);
    }
};

/**
 * Met à jour un ETAPE existant.
 */
export const updateEtape = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const updatedEtape = await etapeService.update(id, req.body);
        if (!updatedEtape) {
            res.status(404).json({ message: "Etape not found" });
        } else {
            res.json(updatedEtape);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * Supprime un ETAPE par ID_ETAPE.
 */
export const deleteEtape = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const deletedEtape = await etapeService.delete(id);
        if (!deletedEtape) {
            res.status(404).json({ message: "Etape not found" });
        } else {
            res.json({
                message: "Etape deleted successfully",
                etape: deletedEtape,
            });
        }
    } catch (err) {
        next(err);
    }
};
