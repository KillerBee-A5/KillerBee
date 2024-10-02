import { Request, Response, NextFunction } from "express";
import { getConnectionPool } from "../services/db";
import { COMPOSER } from "../models";
import sql from "mssql";

export const getAllComposer = async (
    req: Request,
    res: Response<COMPOSER[]>,
    next: NextFunction
) => {
    try {
        const pool = await getConnectionPool();
        const result = await pool.request().query("SELECT * FROM dbo.COMPOSER");
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
};

export const createComposer = async (
    req: Request<{}, {}, COMPOSER>,
    res: Response<{ message: string }>,
    next: NextFunction
) => {
    try {
        const { ID_PROCEDE, ID_ETAPE, ORDRE } = req.body;
        const pool = await getConnectionPool();
        await pool
            .request()
            .input("ID_PROCEDE", sql.Int, ID_PROCEDE)
            .input("ID_ETAPE", sql.Int, ID_ETAPE)
            .input("ORDRE", sql.Int, ORDRE).query(`
        INSERT INTO dbo.COMPOSER (ID_PROCEDE, ID_ETAPE, ORDRE)
        VALUES (@ID_PROCEDE, @ID_ETAPE, @ORDRE)
      `);
        res.status(201).json({ message: "Association created successfully" });
    } catch (err) {
        next(err);
    }
};

export const deleteComposer = async (
    req: Request<{}, {}, { ID_PROCEDE: number; ID_ETAPE: number }>,
    res: Response<{ message: string }>,
    next: NextFunction
) => {
    try {
        const { ID_PROCEDE, ID_ETAPE } = req.body;
        const pool = await getConnectionPool();
        await pool
            .request()
            .input("ID_PROCEDE", sql.Int, ID_PROCEDE)
            .input("ID_ETAPE", sql.Int, ID_ETAPE).query(`
        DELETE FROM dbo.COMPOSER
        WHERE ID_PROCEDE = @ID_PROCEDE AND ID_ETAPE = @ID_ETAPE
      `);
        res.json({ message: "Association deleted successfully" });
    } catch (err) {
        next(err);
    }
};
