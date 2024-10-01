import { poolPromise } from "../db";
import { Constituer } from "../models/constituer";

export class ConstituerService {
    async getConstituentsForFrizbee(frizbeeId: number): Promise<Constituer[]> {
        const pool = await poolPromise;
        const result = await pool.request().input("ID_FRIZBEE", frizbeeId)
            .query(`
        SELECT * FROM CONSTITUER WHERE ID_FRIZBEE = @ID_FRIZBEE
      `);
        return result.recordset;
    }

    async addConstituentToFrizbee(constituer: Constituer): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("ID_FRIZBEE", constituer.ID_FRIZBEE)
            .input("ID_INGREDIENT", constituer.ID_INGREDIENT)
            .input("GRAMMAGE", constituer.GRAMMAGE).query(`
        INSERT INTO CONSTITUER (ID_FRIZBEE, ID_INGREDIENT, GRAMMAGE)
        VALUES (@ID_FRIZBEE, @ID_INGREDIENT, @GRAMMAGE)
      `);
    }

    async removeConstituentFromFrizbee(
        frizbeeId: number,
        ingredientId: number
    ): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("ID_FRIZBEE", frizbeeId)
            .input("ID_INGREDIENT", ingredientId).query(`
        DELETE FROM CONSTITUER WHERE ID_FRIZBEE = @ID_FRIZBEE AND ID_INGREDIENT = @ID_INGREDIENT
      `);
    }
}
