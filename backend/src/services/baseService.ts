import sql from "mssql";
import { getConnectionPool } from "./db";

export class BaseService<T> {
    private readonly tableName: string;
    private readonly primaryKey: string;

    constructor(tableName: string, primaryKey: string) {
        this.tableName = tableName;
        this.primaryKey = primaryKey;
    }

    /**
     * Récupère tous les enregistrements de la table.
     */
    async getAll(): Promise<T[]> {
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .query(`SELECT * FROM dbo.${this.tableName}`);
        return result.recordset;
    }

    /**
     * Récupère un enregistrement par ID.
     * @param id - L'ID de l'enregistrement.
     */
    async getById(id: number): Promise<T | null> {
        const pool = await getConnectionPool();
        const result = await pool
            .request()
            .input(this.primaryKey, sql.Int, id)
            .query(
                `SELECT * FROM dbo.${this.tableName} WHERE ${this.primaryKey} = @${this.primaryKey}`
            );

        const record = result.recordset[0];
        return record || null;
    }

    /**
     * Crée un nouvel enregistrement.
     * @param data - Les données de l'enregistrement, excluant 'id'.
     */
    async create(data: Omit<T, "id">): Promise<T> {
        const pool = await getConnectionPool();

        const columns = Object.keys(data);
        const values = columns.map((col) => `@${col}`).join(", ");
        const request = pool.request();

        columns.forEach((col) => {
            const value = (data as any)[col];
            if (typeof value === "number") {
                request.input(col, sql.Int, value);
            } else if (typeof value === "string") {
                request.input(col, sql.VarChar(sql.MAX), value);
            } else {
                // Gérer d'autres types si nécessaire
                request.input(col, sql.VarChar(sql.MAX), value);
            }
        });

        const query = `
            INSERT INTO dbo.${this.tableName} (${columns.join(", ")})
            OUTPUT INSERTED.*
            VALUES (${values})
        `;

        const result = await request.query(query);
        return result.recordset[0];
    }

    /**
     * Met à jour un enregistrement existant.
     * @param id - L'ID de l'enregistrement.
     * @param data - Les données à mettre à jour, excluant 'id'.
     */
    async update(id: number, data: Omit<Partial<T>, "id">): Promise<T | null> {
        const pool = await getConnectionPool();

        const columns = Object.keys(data);
        const setClause = columns.map((col) => `${col} = @${col}`).join(", ");
        const request = pool.request().input(this.primaryKey, sql.Int, id);

        columns.forEach((col) => {
            const value = (data as any)[col];
            if (typeof value === "number") {
                request.input(col, sql.Int, value);
            } else if (typeof value === "string") {
                request.input(col, sql.VarChar(sql.MAX), value);
            } else {
                // Gérer d'autres types si nécessaire
                request.input(col, sql.VarChar(sql.MAX), value);
            }
        });

        const query = `
            UPDATE dbo.${this.tableName}
            SET ${setClause}
            OUTPUT INSERTED.*
            WHERE ${this.primaryKey} = @${this.primaryKey}
        `;

        const result = await request.query(query);
        return result.recordset[0] || null;
    }

    /**
     * Supprime un enregistrement par ID.
     * @param id - L'ID de l'enregistrement.
     */
    async delete(id: number): Promise<T | null> {
        const pool = await getConnectionPool();
        const result = await pool.request().input(this.primaryKey, sql.Int, id)
            .query(`
                DELETE FROM dbo.${this.tableName}
                OUTPUT DELETED.*
                WHERE ${this.primaryKey} = @${this.primaryKey}
            `);

        const deleted = result.recordset[0];
        return deleted || null;
    }
}
