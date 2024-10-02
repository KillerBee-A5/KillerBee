import { Request, Response, NextFunction } from "express";
import { getConnectionPool } from "../services/db";
import { CONSTITUER } from "../models/constituer";
import sql from "mssql";

export const getAllConstituer = async (
    req: Request,
    res: Response<CONSTITUER[]>,
    next: NextFunction
) => {
    try {
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .query("SELECT * FROM dbo.CONSTITUER");
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
};

export const createConstituer = async (
    req: Request<{}, {}, CONSTITUER>,
    res: Response<{ message: string }>,
    next: NextFunction
) => {
    try {
        const { ID_FRIZBEE, ID_INGREDIENT, GRAMMAGE } = req.body;
        const pool = await getConnectionPool();
        await pool
            .request()
            .input("ID_FRIZBEE", sql.Int, ID_FRIZBEE)
            .input("ID_INGREDIENT", sql.Int, ID_INGREDIENT)
            .input("GRAMMAGE", sql.Decimal(10, 2), GRAMMAGE).query(`
        INSERT INTO dbo.CONSTITUER (ID_FRIZBEE, ID_INGREDIENT, GRAMMAGE)
        VALUES (@ID_FRIZBEE, @ID_INGREDIENT, @GRAMMAGE)
      `);
        res.status(201).json({ message: "Association created successfully" });
    } catch (err) {
        next(err);
    }
};

export const deleteConstituer = async (
    req: Request<{}, {}, { ID_FRIZBEE: number; ID_INGREDIENT: number }>,
    res: Response<{ message: string }>,
    next: NextFunction
) => {
    try {
        const { ID_FRIZBEE, ID_INGREDIENT } = req.body;
        const pool = await getConnectionPool();
        await pool
            .request()
            .input("ID_FRIZBEE", sql.Int, ID_FRIZBEE)
            .input("ID_INGREDIENT", sql.Int, ID_INGREDIENT).query(`
        DELETE FROM dbo.CONSTITUER
        WHERE ID_FRIZBEE = @ID_FRIZBEE AND ID_INGREDIENT = @ID_INGREDIENT
      `);
        res.json({ message: "Association deleted successfully" });
    } catch (err) {
        next(err);
    }
};
