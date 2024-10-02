import { Request, Response, NextFunction } from "express";
import { getConnectionPool } from "../services/db";
import { INGREDIENT } from "../models/INGREDIENT";
import sql from "mssql";

export const getAllIngredients = async (
    req: Request,
    res: Response<INGREDIENT[]>,
    next: NextFunction
) => {
    try {
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .query("SELECT * FROM dbo.INGREDIENT");
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
};

export const getIngredientById = async (
    req: Request<{ id: string }>,
    res: Response<INGREDIENT | { message: string }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_INGREDIENT", sql.Int, parseInt(id))
            .query(
                "SELECT * FROM dbo.INGREDIENT WHERE ID_INGREDIENT = @ID_INGREDIENT"
            );

        const ingredient = result.recordset[0];
        if (!ingredient) {
            res.status(404).json({ message: "Ingrédient not found" });
        } else {
            res.json(ingredient);
        }
    } catch (err) {
        next(err);
    }
};

export const createIngredient = async (
    req: Request<{}, {}, Omit<INGREDIENT, "ID_INGREDIENT">>,
    res: Response<INGREDIENT>,
    next: NextFunction
) => {
    try {
        const { NOM_INGREDIENT, DESCRIPTION_INGREDIENT } = req.body;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("NOM_INGREDIENT", sql.VarChar(100), NOM_INGREDIENT)
            .input(
                "DESCRIPTION_INGREDIENT",
                sql.VarChar(250),
                DESCRIPTION_INGREDIENT
            ).query(`
        INSERT INTO dbo.INGREDIENT (NOM_INGREDIENT, DESCRIPTION_INGREDIENT)
        OUTPUT INSERTED.*
        VALUES (@NOM_INGREDIENT, @DESCRIPTION_INGREDIENT)
      `);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        next(err);
    }
};

export const updateIngredient = async (
    req: Request<{ id: string }, {}, Omit<INGREDIENT, "ID_INGREDIENT">>,
    res: Response<INGREDIENT | { message: string }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { NOM_INGREDIENT, DESCRIPTION_INGREDIENT } = req.body;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_INGREDIENT", sql.Int, parseInt(id))
            .input("NOM_INGREDIENT", sql.VarChar(100), NOM_INGREDIENT)
            .input(
                "DESCRIPTION_INGREDIENT",
                sql.VarChar(250),
                DESCRIPTION_INGREDIENT
            ).query(`
        UPDATE dbo.INGREDIENT
        SET NOM_INGREDIENT = @NOM_INGREDIENT,
            DESCRIPTION_INGREDIENT = @DESCRIPTION_INGREDIENT
        OUTPUT INSERTED.*
        WHERE ID_INGREDIENT = @ID_INGREDIENT
      `);

        const updatedIngredient = result.recordset[0];
        if (!updatedIngredient) {
            res.status(404).json({ message: "Ingrédient not found" });
        } else {
            res.json(updatedIngredient);
        }
    } catch (err) {
        next(err);
    }
};

export const deleteIngredient = async (
    req: Request<{ id: string }>,
    res: Response<{ message: string; ingredient?: INGREDIENT }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_INGREDIENT", sql.Int, parseInt(id)).query(`
        DELETE FROM dbo.INGREDIENT
        OUTPUT DELETED.*
        WHERE ID_INGREDIENT = @ID_INGREDIENT
      `);

        const deletedIngredient = result.recordset[0];
        if (!deletedIngredient) {
            res.status(404).json({ message: "Ingrédient not found" });
        } else {
            res.json({
                message: "Ingrédient deleted successfully",
                ingredient: deletedIngredient,
            });
        }
    } catch (err) {
        next(err);
    }
};
