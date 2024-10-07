// src/controllers/gammeController.ts
import { Request, Response, NextFunction } from "express";
import { GammeService } from "../services/gammeService";

const gammeService = new GammeService();

/**
 * Récupère toutes les GAMME.
 */
export const getAllGammes = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const gammes = await gammeService.getAll();
        res.json(gammes);
    } catch (err) {
        next(err);
    }
};

/**
 * Récupère une GAMME par ID_GAMME.
 */
export const getGammeById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const gamme = await gammeService.getById(id);
        if (!gamme) {
            res.status(404).json({ message: "Gamme not found" });
        } else {
            res.json(gamme);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * Crée une nouvelle GAMME.
 */
export const createGamme = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newGamme = await gammeService.create(req.body);
        res.status(201).json(newGamme);
    } catch (err) {
        next(err);
    }
};

/**
 * Met à jour une GAMME existante.
 */
export const updateGamme = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const updatedGamme = await gammeService.update(id, req.body);
        if (!updatedGamme) {
            res.status(404).json({ message: "Gamme not found" });
        } else {
            res.json(updatedGamme);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * Supprime une GAMME par ID_GAMME.
 */
export const deleteGamme = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const deletedGamme = await gammeService.delete(id);
        if (!deletedGamme) {
            res.status(404).json({ message: "Gamme not found" });
        } else {
            res.json({
                message: "Gamme deleted successfully",
                gamme: deletedGamme,
            });
        }
    } catch (err) {
        next(err);
    }
};
