import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index";
import { poolPromise } from "./db";

dotenv.config();

const app: Application = express();

// Utilisation de poolPromise pour la base de données
poolPromise
    .then((pool) => {
        console.log("Connected to the database");

        // Start the server only after successful DB connection
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed", err);
    });

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Middleware de gestion des erreurs
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Une erreur est survenue",
        error: err.message,
    });
});

// Catch unhandled exceptions
process.on("uncaughtException", (err) => {
    console.error("There was an uncaught error", err);
    process.exit(1); // Mandatorily exit after catching the error
});

// Catch unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});

export default app;
