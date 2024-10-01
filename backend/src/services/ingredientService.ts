import { poolPromise } from "../db";
import { Ingredient } from "../models/ingredient";

export class IngredientService {
    async getAllIngredients(): Promise<Ingredient[]> {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM INGREDIENT");
        return result.recordset;
    }

    async getIngredientById(id: number): Promise<Ingredient | null> {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("ID_INGREDIENT", id)
            .query(
                "SELECT * FROM INGREDIENT WHERE ID_INGREDIENT = @ID_INGREDIENT"
            );
        return result.recordset.length ? result.recordset[0] : null;
    }

    async createIngredient(ingredient: Ingredient): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("NOM_INGREDIENT", ingredient.NOM_INGREDIENT)
            .input("DESCRIPTION_INGREDIENT", ingredient.DESCRIPTION_INGREDIENT)
            .query(`
        INSERT INTO INGREDIENT (NOM_INGREDIENT, DESCRIPTION_INGREDIENT)
        VALUES (@NOM_INGREDIENT, @DESCRIPTION_INGREDIENT)
      `);
    }

    async updateIngredient(
        id: number,
        ingredient: Partial<Ingredient>
    ): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("ID_INGREDIENT", id)
            .input("NOM_INGREDIENT", ingredient.NOM_INGREDIENT)
            .input("DESCRIPTION_INGREDIENT", ingredient.DESCRIPTION_INGREDIENT)
            .query(`
        UPDATE INGREDIENT
        SET NOM_INGREDIENT = @NOM_INGREDIENT, DESCRIPTION_INGREDIENT = @DESCRIPTION_INGREDIENT
        WHERE ID_INGREDIENT = @ID_INGREDIENT
      `);
    }

    async deleteIngredient(id: number): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("ID_INGREDIENT", id)
            .query(
                "DELETE FROM INGREDIENT WHERE ID_INGREDIENT = @ID_INGREDIENT"
            );
    }
}
