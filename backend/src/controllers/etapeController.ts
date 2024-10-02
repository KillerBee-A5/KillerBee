import { Request, Response, NextFunction } from "express";
import { getConnectionPool } from "../services/db";
import { ETAPE } from "../models/ETAPE";
import sql from "mssql";

export const getAllEtapes = async (
    req: Request,
    res: Response<ETAPE[]>,
    next: NextFunction
) => {
    try {
        const pool = await getConnectionPool();
        const result = await pool.request().query("SELECT * FROM dbo.ETAPE");
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
};

export const getEtapeById = async (
    req: Request<{ id: string }>,
    res: Response<ETAPE | { message: string }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_ETAPE", sql.Int, parseInt(id))
            .query("SELECT * FROM dbo.ETAPE WHERE ID_ETAPE = @ID_ETAPE");

        const etape = result.recordset[0];
        if (!etape) {
            res.status(404).json({ message: "Etape not found" });
        } else {
            res.json(etape);
        }
    } catch (err) {
        next(err);
    }
};

export const createEtape = async (
    req: Request<{}, {}, Omit<ETAPE, "ID_ETAPE">>,
    res: Response<ETAPE>,
    next: NextFunction
) => {
    try {
        const { NOM_ETAPE, DESCRIPTION_ETAPE } = req.body;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("NOM_ETAPE", sql.VarChar(100), NOM_ETAPE)
            .input("DESCRIPTION_ETAPE", sql.VarChar(250), DESCRIPTION_ETAPE)
            .query(`
        INSERT INTO dbo.ETAPE (NOM_ETAPE, DESCRIPTION_ETAPE)
        OUTPUT INSERTED.*
        VALUES (@NOM_ETAPE, @DESCRIPTION_ETAPE)
      `);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        next(err);
    }
};

export const updateEtape = async (
    req: Request<{ id: string }, {}, Omit<ETAPE, "ID_ETAPE">>,
    res: Response<ETAPE | { message: string }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { NOM_ETAPE, DESCRIPTION_ETAPE } = req.body;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_ETAPE", sql.Int, parseInt(id))
            .input("NOM_ETAPE", sql.VarChar(100), NOM_ETAPE)
            .input("DESCRIPTION_ETAPE", sql.VarChar(250), DESCRIPTION_ETAPE)
            .query(`
        UPDATE dbo.ETAPE
        SET NOM_ETAPE = @NOM_ETAPE,
            DESCRIPTION_ETAPE = @DESCRIPTION_ETAPE
        OUTPUT INSERTED.*
        WHERE ID_ETAPE = @ID_ETAPE
      `);

        const updatedEtape = result.recordset[0];
        if (!updatedEtape) {
            res.status(404).json({ message: "Etape not found" });
        } else {
            res.json(updatedEtape);
        }
    } catch (err) {
        next(err);
    }
};

export const deleteEtape = async (
    req: Request<{ id: string }>,
    res: Response<{ message: string; etape?: ETAPE }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_ETAPE", sql.Int, parseInt(id)).query(`
        DELETE FROM dbo.ETAPE
        OUTPUT DELETED.*
        WHERE ID_ETAPE = @ID_ETAPE
      `);

        const deletedEtape = result.recordset[0];
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
