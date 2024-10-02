import app from "./app";
import { getConnectionPool } from "./services/db";

const PORT: number = parseInt(process.env.PORT ?? "3000", 10);

(async () => {
    try {
        // Vérifier la connexion à la base de données avant de démarrer le serveur
        await getConnectionPool();

        app.listen(PORT, () => {
            console.log(`Backend running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Erreur lors du démarrage du serveur :", err);
        process.exit(1);
    }
})();
