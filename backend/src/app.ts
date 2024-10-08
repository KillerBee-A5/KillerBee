import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import rateLimit from "express-rate-limit";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Appliquer une limite de requêtes (exemple : 30 requêtes par minute)
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30, // Limite chaque IP à 30 requêtes par fenêtre
    message:
        "Trop de requêtes créées depuis cette IP, veuillez réessayer après une minute",
});
app.use(limiter);

// Middleware de gestion des erreurs
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        res.status(500).json({ error: err.message });
    } else {
        res.status(500).json({ error: "Une erreur inconnue est survenue" });
    }
});

export default app;
