import { poolPromise } from "../db";
import { Gamme } from "../models/gamme";

export class GammeService {
    async getAllGammes(): Promise<Gamme[]> {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM GAMME");
        return result.recordset;
    }

    async getGammeById(id: number): Promise<Gamme | null> {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("ID_GAMME", id)
            .query("SELECT * FROM GAMME WHERE ID_GAMME = @ID_GAMME");
        return result.recordset.length ? result.recordset[0] : null;
    }

    async createGamme(gamme: Gamme): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("NOM_GAMME", gamme.NOM_GAMME)
            .query("INSERT INTO GAMME (NOM_GAMME) VALUES (@NOM_GAMME)");
    }

    async updateGamme(id: number, gamme: Partial<Gamme>): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("ID_GAMME", id)
            .input("NOM_GAMME", gamme.NOM_GAMME)
            .query(
                "UPDATE GAMME SET NOM_GAMME = @NOM_GAMME WHERE ID_GAMME = @ID_GAMME"
            );
    }

    async deleteGamme(id: number): Promise<void> {
        const pool = await poolPromise;
        await pool
            .request()
            .input("ID_GAMME", id)
            .query("DELETE FROM GAMME WHERE ID_GAMME = @ID_GAMME");
    }
}
