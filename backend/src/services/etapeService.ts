import { poolPromise } from "../db";
import { Etape } from "../models/etape";

export class EtapeService {
    async getAllEtapes(): Promise<Etape[]> {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM ETAPE");
        return result.recordset;
    }

    async getEtapeById(id: number): Promise<Etape | null> {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("ID_ETAPE", id)
            .query("SELECT * FROM ETAPE WHERE ID_ETAPE = @ID_ETAPE");
        return result.recordset.length ? result.recordset[0] : null;
    }

    async createEtape(etape: Etape): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("NOM_ETAPE", etape.NOM_ETAPE)
            .input("DESCRIPTION_ETAPE", etape.DESCRIPTION_ETAPE).query(`
        INSERT INTO ETAPE (NOM_ETAPE, DESCRIPTION_ETAPE)
        VALUES (@NOM_ETAPE, @DESCRIPTION_ETAPE)
      `);
    }

    async updateEtape(id: number, etape: Partial<Etape>): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("ID_ETAPE", id)
            .input("NOM_ETAPE", etape.NOM_ETAPE)
            .input("DESCRIPTION_ETAPE", etape.DESCRIPTION_ETAPE).query(`
        UPDATE ETAPE
        SET NOM_ETAPE = @NOM_ETAPE, DESCRIPTION_ETAPE = @DESCRIPTION_ETAPE
        WHERE ID_ETAPE = @ID_ETAPE
      `);
    }

    async deleteEtape(id: number): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("ID_ETAPE", id)
            .query("DELETE FROM ETAPE WHERE ID_ETAPE = @ID_ETAPE");
    }
}
