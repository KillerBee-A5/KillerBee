import { ConnectionPool } from "mssql";

export interface FRIZBEE {
    ID_FRIZBEE: number;
    NOM_FRIZBEE: string;
    DESCRIPTION_FRIZBEE: string;
    PUHT: number;
    STOCK: number;
    ID_PROCEDE: number;
    ID_GAMME: number;
    ORDRE: number;
}

export class FRIZBEEModel {
    private pool: ConnectionPool;

    constructor(pool: ConnectionPool) {
        this.pool = pool;
    }

    async getAllFRIZBEE(): Promise<FRIZBEE[]> {
        const result = await this.pool.request().query("SELECT * FROM FRIZBEE");
        return result.recordset;
    }

    async getFRIZBEEById(id: number): Promise<FRIZBEE | null> {
        const result = await this.pool
            .request()
            .input("ID_FRIZBEE", id)
            .query("SELECT * FROM FRIZBEE WHERE ID_FRIZBEE = @ID_FRIZBEE");
        return result.recordset[0] || null;
    }

    async createFRIZBEE(
        frizbee: Omit<FRIZBEE, "ID_FRIZBEE">
    ): Promise<FRIZBEE> {
        const result = await this.pool
            .request()
            .input("NOM_FRIZBEE", frizbee.NOM_FRIZBEE)
            .input("DESCRIPTION_FRIZBEE", frizbee.DESCRIPTION_FRIZBEE)
            .input("PUHT", frizbee.PUHT)
            .input("STOCK", frizbee.STOCK)
            .input("ID_PROCEDE", frizbee.ID_PROCEDE)
            .input("ID_GAMME", frizbee.ID_GAMME)
            .input("ORDRE", frizbee.ORDRE).query(`
                INSERT INTO FRIZBEE (NOM_FRIZBEE, DESCRIPTION_FRIZBEE, PUHT, STOCK, ID_PROCEDE, ID_GAMME, ORDRE)
                OUTPUT INSERTED.*
                VALUES (@NOM_FRIZBEE, @DESCRIPTION_FRIZBEE, @PUHT, @STOCK, @ID_PROCEDE, @ID_GAMME, @ORDRE)
            `);
        return result.recordset[0];
    }

    async updateFRIZBEE(
        id: number,
        frizbee: Partial<Omit<FRIZBEE, "ID_FRIZBEE">>
    ): Promise<FRIZBEE | null> {
        const fields = Object.keys(frizbee).map(
            (key, index) => `${key} = @field${index}`
        );
        const query = `
            UPDATE FRIZBEE
            SET ${fields.join(", ")}
            OUTPUT INSERTED.*
            WHERE ID_FRIZBEE = @ID_FRIZBEE
        `;
        const request = this.pool.request().input("ID_FRIZBEE", id);
        Object.entries(frizbee).forEach(([key, value], index) => {
            request.input(`field${index}`, value);
        });
        const result = await request.query(query);
        return result.recordset[0] || null;
    }

    async deleteFRIZBEE(id: number): Promise<boolean> {
        const result = await this.pool
            .request()
            .input("ID_FRIZBEE", id)
            .query("DELETE FROM FRIZBEE WHERE ID_FRIZBEE = @ID_FRIZBEE");
        return result.rowsAffected[0] > 0;
    }
}
