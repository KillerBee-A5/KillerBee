// src/controllers/frizbeeController.ts
import { Request, Response, NextFunction } from "express";
import { FrizbeeService } from "../services/frizbeeService";

const frizbeeService = new FrizbeeService();

/**
 * Récupère tous les Frizbees.
 */
export const getAllFrizbees = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const frizbees = await frizbeeService.getAll();
        res.json(frizbees);
    } catch (err) {
        next(err);
    }
};

/**
 * Récupère un Frizbee par ID.
 */
export const getFrizbeeById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const frizbee = await frizbeeService.getById(id);
        if (!frizbee) {
            res.status(404).json({ message: "Frizbee not found" });
        } else {
            res.json(frizbee);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * Crée un nouveau Frizbee.
 */
export const createFrizbee = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newFrizbee = await frizbeeService.create(req.body);
        res.status(201).json(newFrizbee);
    } catch (err) {
        next(err);
    }
};

/**
 * Met à jour un Frizbee existant.
 */
export const updateFrizbee = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const updatedFrizbee = await frizbeeService.update(id, req.body);
        if (!updatedFrizbee) {
            res.status(404).json({ message: "Frizbee not found" });
        } else {
            res.json(updatedFrizbee);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * Supprime un Frizbee par ID.
 */
export const deleteFrizbee = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const deletedFrizbee = await frizbeeService.delete(id);
        if (!deletedFrizbee) {
            res.status(404).json({ message: "Frizbee not found" });
        } else {
            res.json({
                message: "Frizbee deleted successfully",
                frizbee: deletedFrizbee,
            });
        }
    } catch (err) {
        next(err);
    }
};
