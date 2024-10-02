import { Request, Response, NextFunction } from "express";
import { getConnectionPool } from "../services/db";
import { FRIZBEE } from "../models/FRIZBEE";
import { INGREDIENT } from "../models/INGREDIENT";
import { caesarEncrypt, caesarDecrypt } from "../utils/caesarCipher";
import sql from "mssql";

export const getAllFrizbees = async (
    req: Request,
    res: Response<FRIZBEE[]>,
    next: NextFunction
) => {
    try {
        const pool = await getConnectionPool();
        const result = await pool.request().query("SELECT * FROM dbo.FRIZBEE");
        const frizbees = result.recordset.map((frizbee) => {
            frizbee.DESCRIPTION_FRIZBEE = caesarDecrypt(
                frizbee.DESCRIPTION_FRIZBEE,
                3
            );
            return frizbee;
        });
        res.json(frizbees);
    } catch (err) {
        next(err);
    }
};

export const getFrizbeeById = async (
    req: Request<{ id: string }>,
    res: Response<FRIZBEE | { message: string }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_FRIZBEE", sql.Int, parseInt(id))
            .query("SELECT * FROM dbo.FRIZBEE WHERE ID_FRIZBEE = @ID_FRIZBEE");

        const frizbee = result.recordset[0];
        if (!frizbee) {
            res.status(404).json({ message: "Frizbee not found" });
        } else {
            frizbee.DESCRIPTION_FRIZBEE = caesarDecrypt(
                frizbee.DESCRIPTION_FRIZBEE,
                3
            );
            res.json(frizbee);
        }
    } catch (err) {
        next(err);
    }
};

export const createFrizbee = async (
    req: Request<{}, {}, Omit<FRIZBEE, "ID_FRIZBEE">>,
    res: Response<FRIZBEE>,
    next: NextFunction
) => {
    try {
        const frizbeeData = req.body;
        frizbeeData.DESCRIPTION_FRIZBEE = caesarEncrypt(
            frizbeeData.DESCRIPTION_FRIZBEE,
            3
        );

        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("NOM_FRIZBEE", sql.VarChar(100), frizbeeData.NOM_FRIZBEE)
            .input(
                "DESCRIPTION_FRIZBEE",
                sql.VarChar(250),
                frizbeeData.DESCRIPTION_FRIZBEE
            )
            .input("PUHT", sql.Decimal(10, 2), frizbeeData.PUHT)
            .input("STOCK", sql.Int, frizbeeData.STOCK)
            .input("ID_PROCEDE", sql.Int, frizbeeData.ID_PROCEDE)
            .input("ID_GAMME", sql.Int, frizbeeData.ID_GAMME)
            .input("ORDRE", sql.Int, frizbeeData.ORDRE).query(`
        INSERT INTO dbo.FRIZBEE (NOM_FRIZBEE, DESCRIPTION_FRIZBEE, PUHT, STOCK, ID_PROCEDE, ID_GAMME, ORDRE)
        OUTPUT INSERTED.*
        VALUES (@NOM_FRIZBEE, @DESCRIPTION_FRIZBEE, @PUHT, @STOCK, @ID_PROCEDE, @ID_GAMME, @ORDRE)
      `);

        const newFrizbee = result.recordset[0];
        newFrizbee.DESCRIPTION_FRIZBEE = caesarDecrypt(
            newFrizbee.DESCRIPTION_FRIZBEE,
            3
        );
        res.status(201).json(newFrizbee);
    } catch (err) {
        next(err);
    }
};

export const updateFrizbee = async (
    req: Request<{ id: string }, {}, Partial<Omit<FRIZBEE, "ID_FRIZBEE">>>,
    res: Response<FRIZBEE | { message: string }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const frizbeeData = req.body;

        if (frizbeeData.DESCRIPTION_FRIZBEE) {
            frizbeeData.DESCRIPTION_FRIZBEE = caesarEncrypt(
                frizbeeData.DESCRIPTION_FRIZBEE,
                3
            );
        }

        const fields = Object.keys(frizbeeData)
            .map((key) => `${key} = @${key}`)
            .join(", ");

        if (!fields) {
            res.status(400).json({ message: "No fields to update" });
            return;
        }

        const pool = await getConnectionPool();
        const request = pool
            .request()
            .input("ID_FRIZBEE", sql.Int, parseInt(id));

        for (const [key, value] of Object.entries(frizbeeData)) {
            if (key === "PUHT") {
                request.input(key, sql.Decimal(10, 2), value);
            } else if (
                key === "STOCK" ||
                key === "ID_PROCEDE" ||
                key === "ID_GAMME" ||
                key === "ORDRE"
            ) {
                request.input(key, sql.Int, value);
            } else {
                request.input(key, sql.VarChar(250), value);
            }
        }

        const result = await request.query(`
      UPDATE dbo.FRIZBEE
      SET ${fields}
      OUTPUT INSERTED.*
      WHERE ID_FRIZBEE = @ID_FRIZBEE
    `);

        const updatedFrizbee = result.recordset[0];
        if (!updatedFrizbee) {
            res.status(404).json({ message: "Frizbee not found" });
        } else {
            updatedFrizbee.DESCRIPTION_FRIZBEE = caesarDecrypt(
                updatedFrizbee.DESCRIPTION_FRIZBEE,
                3
            );
            res.json(updatedFrizbee);
        }
    } catch (err) {
        next(err);
    }
};

export const deleteFrizbee = async (
    req: Request<{ id: string }>,
    res: Response<{ message: string; frizbee?: FRIZBEE }>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_FRIZBEE", sql.Int, parseInt(id)).query(`
        DELETE FROM dbo.FRIZBEE
        OUTPUT DELETED.*
        WHERE ID_FRIZBEE = @ID_FRIZBEE
      `);

        const deletedFrizbee = result.recordset[0];
        if (!deletedFrizbee) {
            res.status(404).json({ message: "Frizbee not found" });
        } else {
            deletedFrizbee.DESCRIPTION_FRIZBEE = caesarDecrypt(
                deletedFrizbee.DESCRIPTION_FRIZBEE,
                3
            );
            res.json({
                message: "Frizbee deleted successfully",
                frizbee: deletedFrizbee,
            });
        }
    } catch (err) {
        next(err);
    }
};

export const getIngredientsByFrizbeeId = async (
    req: Request<{ id: string }>,
    res: Response<(INGREDIENT & { GRAMMAGE: number })[]>,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input("ID_FRIZBEE", sql.Int, parseInt(id)).query(`
        SELECT I.*, C.GRAMMAGE
        FROM dbo.CONSTITUER C
        JOIN dbo.INGREDIENT I ON C.ID_INGREDIENT = I.ID_INGREDIENT
        WHERE C.ID_FRIZBEE = @ID_FRIZBEE
      `);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
};
