import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config: sql.config = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    server: process.env.DB_HOST!,
    database: process.env.DB_NAME!,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

let pool: sql.ConnectionPool | null = null;

export const getConnectionPool = async (): Promise<sql.ConnectionPool> => {
    if (pool) return pool;
    try {
        pool = await sql.connect(config);
        console.log("Connecté à SQL Server");
        return pool;
    } catch (err) {
        console.error("Erreur de connexion à SQL Server : ", err);
        throw err;
    }
};
