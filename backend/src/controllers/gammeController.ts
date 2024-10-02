import { Request, Response, NextFunction } from "express";
import { getConnectionPool } from "../services/db";
import { GAMME } from "../models/gamme";
import sql from "mssql";

export const getAllGammes = async (
    req: Request,
    res: Response<GAMME[]>,
    next: NextFunction
) => {
    try {
        const pool = await getConnectionPool();
        const result = await pool.request().query("SELECT * FROM dbo.GAMME");
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
};

export const getGammeById = async (
    req: Request<{ id: string }>,
    res: Response<GAMME | { message: string }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_GAMME", sql.Int, parseInt(id))
            .query("SELECT * FROM dbo.GAMME WHERE ID_GAMME = @ID_GAMME");

        const gamme = result.recordset[0];
        if (!gamme) {
            res.status(404).json({ message: "Gamme not found" });
        } else {
            res.json(gamme);
        }
    } catch (err) {
        next(err);
    }
};

export const createGamme = async (
    req: Request<{}, {}, Omit<GAMME, "ID_GAMME">>,
    res: Response<GAMME>,
    next: NextFunction
) => {
    try {
        const { NOM_GAMME } = req.body;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("NOM_GAMME", sql.VarChar(100), NOM_GAMME).query(`
        INSERT INTO dbo.GAMME (NOM_GAMME)
        OUTPUT INSERTED.*
        VALUES (@NOM_GAMME)
      `);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        next(err);
    }
};

export const updateGamme = async (
    req: Request<{ id: string }, {}, Omit<GAMME, "ID_GAMME">>,
    res: Response<GAMME | { message: string }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { NOM_GAMME } = req.body;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_GAMME", sql.Int, parseInt(id))
            .input("NOM_GAMME", sql.VarChar(100), NOM_GAMME).query(`
        UPDATE dbo.GAMME
        SET NOM_GAMME = @NOM_GAMME
        OUTPUT INSERTED.*
        WHERE ID_GAMME = @ID_GAMME
      `);

        const updatedGamme = result.recordset[0];
        if (!updatedGamme) {
            res.status(404).json({ message: "Gamme not found" });
        } else {
            res.json(updatedGamme);
        }
    } catch (err) {
        next(err);
    }
};

export const deleteGamme = async (
    req: Request<{ id: string }>,
    res: Response<{ message: string; gamme?: GAMME }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_GAMME", sql.Int, parseInt(id)).query(`
        DELETE FROM dbo.GAMME
        OUTPUT DELETED.*
        WHERE ID_GAMME = @ID_GAMME
      `);

        const deletedGamme = result.recordset[0];
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
