import { Request, Response, NextFunction } from "express";
import { getConnectionPool } from "../services/db";
import { PROCEDE } from "../models/PROCEDE";
import { ETAPE } from "../models/ETAPE";
import sql from "mssql";

export const getAllProcedes = async (
    req: Request,
    res: Response<PROCEDE[]>,
    next: NextFunction
) => {
    try {
        const pool = await getConnectionPool();
        const result = await pool.request().query("SELECT * FROM dbo.PROCEDE");
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
};

export const getProcedeById = async (
    req: Request<{ id: string }>,
    res: Response<PROCEDE | { message: string }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_PROCEDE", sql.Int, parseInt(id))
            .query("SELECT * FROM dbo.PROCEDE WHERE ID_PROCEDE = @ID_PROCEDE");

        const procede = result.recordset[0];
        if (!procede) {
            res.status(404).json({ message: "Procédé not found" });
        } else {
            res.json(procede);
        }
    } catch (err) {
        next(err);
    }
};

export const createProcede = async (
    req: Request<{}, {}, Omit<PROCEDE, "ID_PROCEDE">>,
    res: Response<PROCEDE>,
    next: NextFunction
) => {
    try {
        const { NOM_PROCEDE, DESCRIPTION_PROCEDE } = req.body;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("NOM_PROCEDE", sql.VarChar(100), NOM_PROCEDE)
            .input("DESCRIPTION_PROCEDE", sql.VarChar(250), DESCRIPTION_PROCEDE)
            .query(`
        INSERT INTO dbo.PROCEDE (NOM_PROCEDE, DESCRIPTION_PROCEDE)
        OUTPUT INSERTED.*
        VALUES (@NOM_PROCEDE, @DESCRIPTION_PROCEDE)
      `);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        next(err);
    }
};

export const updateProcede = async (
    req: Request<{ id: string }, {}, Omit<PROCEDE, "ID_PROCEDE">>,
    res: Response<PROCEDE | { message: string }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { NOM_PROCEDE, DESCRIPTION_PROCEDE } = req.body;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_PROCEDE", sql.Int, parseInt(id))
            .input("NOM_PROCEDE", sql.VarChar(100), NOM_PROCEDE)
            .input("DESCRIPTION_PROCEDE", sql.VarChar(250), DESCRIPTION_PROCEDE)
            .query(`
        UPDATE dbo.PROCEDE
        SET NOM_PROCEDE = @NOM_PROCEDE,
            DESCRIPTION_PROCEDE = @DESCRIPTION_PROCEDE
        OUTPUT INSERTED.*
        WHERE ID_PROCEDE = @ID_PROCEDE
      `);

        const updatedProcede = result.recordset[0];
        if (!updatedProcede) {
            res.status(404).json({ message: "Procédé not found" });
        } else {
            res.json(updatedProcede);
        }
    } catch (err) {
        next(err);
    }
};

export const deleteProcede = async (
    req: Request<{ id: string }>,
    res: Response<{ message: string; procede?: PROCEDE }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_PROCEDE", sql.Int, parseInt(id)).query(`
        DELETE FROM dbo.PROCEDE
        OUTPUT DELETED.*
        WHERE ID_PROCEDE = @ID_PROCEDE
      `);

        const deletedProcede = result.recordset[0];
        if (!deletedProcede) {
            res.status(404).json({ message: "Procédé not found" });
        } else {
            res.json({
                message: "Procédé deleted successfully",
                procede: deletedProcede,
            });
        }
    } catch (err) {
        next(err);
    }
};

export const getEtapesByProcedeId = async (
    req: Request<{ id: string }>,
    res: Response<ETAPE[]>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_PROCEDE", sql.Int, parseInt(id)).query(`
        SELECT E.*, C.ORDRE
        FROM dbo.COMPOSER C
        JOIN dbo.ETAPE E ON C.ID_ETAPE = E.ID_ETAPE
        WHERE C.ID_PROCEDE = @ID_PROCEDE
        ORDER BY C.ORDRE
      `);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
};
