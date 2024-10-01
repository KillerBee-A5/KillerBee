import { poolPromise } from "../db";
import { Composer } from "../models/composer";

export class ComposerService {
    async getAllCompositions(): Promise<Composer[]> {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM COMPOSER");
        return result.recordset;
    }

    async createComposition(composer: Composer): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("ID_PROCEDE", composer.ID_PROCEDE)
            .input("ID_ETAPE", composer.ID_ETAPE)
            .input("ORDRE", composer.ORDRE).query(`
        INSERT INTO COMPOSER (ID_PROCEDE, ID_ETAPE, ORDRE)
        VALUES (@ID_PROCEDE, @ID_ETAPE, @ORDRE)
      `);
    }

    async deleteComposition(procedeId: number, etapeId: number): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("ID_PROCEDE", procedeId)
            .input("ID_ETAPE", etapeId).query(`
        DELETE FROM COMPOSER WHERE ID_PROCEDE = @ID_PROCEDE AND ID_ETAPE = @ID_ETAPE
      `);
    }
}
