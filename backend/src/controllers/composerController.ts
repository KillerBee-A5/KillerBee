import { Request, Response, NextFunction } from "express";
import { ComposerService } from "../services/composerService";

const composerService = new ComposerService();

/**
 * Récupère tous les COMPOSER.
 */
export const getAllComposers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const composers = await composerService.getAll();
        res.json(composers);
    } catch (err) {
        next(err);
    }
};

/**
 * Récupère un COMPOSER par ID.
 */
export const getComposerById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const composer = await composerService.getById(id);
        if (!composer) {
            res.status(404).json({ message: "Composer not found" });
        } else {
            res.json(composer);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * Crée un nouveau COMPOSER.
 */
export const createComposer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newComposer = await composerService.create(req.body);
        res.status(201).json(newComposer);
    } catch (err) {
        next(err);
    }
};

/**
 * Met à jour un COMPOSER existant.
 */
export const updateComposer = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const updatedComposer = await composerService.update(id, req.body);
        if (!updatedComposer) {
            res.status(404).json({ message: "Composer not found" });
        } else {
            res.json(updatedComposer);
        }
    } catch (err) {
        next(err);
    }
};

/**
 * Supprime un COMPOSER par ID.
 */
export const deleteComposer = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const deletedComposer = await composerService.delete(id);
        if (!deletedComposer) {
            res.status(404).json({ message: "Composer not found" });
        } else {
            res.json({
                message: "Composer deleted successfully",
                composer: deletedComposer,
            });
        }
    } catch (err) {
        next(err);
    }
};
