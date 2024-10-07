// src/controllers/constituerController.ts
import { Request, Response, NextFunction } from "express";
import { ConstituerService } from "../services/constituerService";

const constituerService = new ConstituerService();

/**
 * Récupère tous les CONSTITUER.
 */
export const getAllConstituers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const constituers = await constituerService.getAll();
        res.json(constituers);
    } catch (err) {
        next(err);
    }
};

/**
 * Récupère un CONSTITUER par ID_FRIZBEE.
 */
export const getConstituerById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const constituer = await constituerService.getById(id);
        if (!constituer) {
            res.status(404).json({ message: "Constituer not found" });
        } else {
            res.json(constituer);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * Crée un nouveau CONSTITUER.
 */
export const createConstituer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newConstituer = await constituerService.create(req.body);
        res.status(201).json(newConstituer);
    } catch (err) {
        next(err);
    }
};

/**
 * Met à jour un CONSTITUER existant.
 */
export const updateConstituer = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const updatedConstituer = await constituerService.update(id, req.body);
        if (!updatedConstituer) {
            res.status(404).json({ message: "Constituer not found" });
        } else {
            res.json(updatedConstituer);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * Supprime un CONSTITUER par ID_FRIZBEE.
 */
export const deleteConstituer = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const deletedConstituer = await constituerService.delete(id);
        if (!deletedConstituer) {
            res.status(404).json({ message: "Constituer not found" });
        } else {
            res.json({
                message: "Constituer deleted successfully",
                constituer: deletedConstituer,
            });
        }
    } catch (err) {
        next(err);
    }
};
