import { poolPromise } from "../db";
import { Procede } from "../models/procede";

export class ProcedeService {
    async getAllProcedes(): Promise<Procede[]> {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM PROCEDE");
        return result.recordset;
    }

    async getProcedeById(id: number): Promise<Procede | null> {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("ID_PROCEDE", id)
            .query("SELECT * FROM PROCEDE WHERE ID_PROCEDE = @ID_PROCEDE");
        return result.recordset.length ? result.recordset[0] : null;
    }

    async createProcede(procede: Procede): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("NOM_PROCEDE", procede.NOM_PROCEDE)
            .input("DESCRIPTION_PROCEDE", procede.DESCRIPTION_PROCEDE).query(`
        INSERT INTO PROCEDE (NOM_PROCEDE, DESCRIPTION_PROCEDE)
        VALUES (@NOM_PROCEDE, @DESCRIPTION_PROCEDE)
      `);
    }

    async updateProcede(id: number, procede: Partial<Procede>): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("ID_PROCEDE", id)
            .input("NOM_PROCEDE", procede.NOM_PROCEDE)
            .input("DESCRIPTION_PROCEDE", procede.DESCRIPTION_PROCEDE).query(`
        UPDATE PROCEDE
        SET NOM_PROCEDE = @NOM_PROCEDE, DESCRIPTION_PROCEDE = @DESCRIPTION_PROCEDE
        WHERE ID_PROCEDE = @ID_PROCEDE
      `);
    }

    async deleteProcede(id: number): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("ID_PROCEDE", id)
            .query("DELETE FROM PROCEDE WHERE ID_PROCEDE = @ID_PROCEDE");
    }
}
