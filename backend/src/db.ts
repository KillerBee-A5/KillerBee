import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config: sql.config = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    server: process.env.DB_HOST!,
    database: process.env.DB_NAME!,
    options: {
        trustServerCertificate: true, // Changez selon vos besoins
    },
};

// Gérer explicitement les erreurs de connexion
let pool: sql.ConnectionPool | null = null;

export const poolPromise = new Promise<sql.ConnectionPool>(
    (resolve, reject) => {
        if (pool) {
            resolve(pool);
        } else {
            new sql.ConnectionPool(config)
                .connect()
                .then((p) => {
                    pool = p;
                    console.log("Connecté à SQL Server");
                    resolve(pool);
                })
                .catch((err) => {
                    console.error("Erreur de connexion à SQL Server : ", err);
                    reject(new Error(err));
                });
        }
    }
);
