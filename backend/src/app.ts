import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import rateLimit from "express-rate-limit";
import ldap from "ldapjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// Récupérer les variables d'environnement
const LDAP_URL = process.env.AD_URL as string;
const LDAP_DOMAIN = process.env.AD_DOMAIN as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

// Vérifier que les variables d'environnement sont définies
if (!LDAP_URL || !LDAP_DOMAIN || !JWT_SECRET) {
    throw new Error(
        "Veuillez définir les variables d'environnement AD_URL, AD_DOMAIN et JWT_SECRET"
    );
}

// Créer le client LDAP
const client = ldap.createClient({
    url: LDAP_URL,
    // Si vous utilisez LDAPS, décommentez la ligne suivante et configurez les options TLS
    // tlsOptions: { rejectUnauthorized: false },
});

// Route de connexion
app.post("/login", (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Formater le nom d'utilisateur avec le domaine
    const userPrincipalName = `${LDAP_DOMAIN}\\${username}`;

    client.bind(userPrincipalName, password, (err) => {
        if (err) {
            console.error("Erreur LDAP:", err);
            res.status(401).json({ message: "Authentification échouée" });
        } else {
            // Générer un token JWT
            const token = jwt.sign({ username }, JWT_SECRET, {
                expiresIn: "1h",
            });
            res.status(200).json({ token });
        }
    });
});

// Middleware pour vérifier le token JWT
const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
        res.sendStatus(401);
        return;
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        (req as any).user = user;
        next();
    } catch (err) {
        res.sendStatus(403);
    }
};

// Appliquer une limite de requêtes (exemple : 30 requêtes par minute)
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30, // Limite chaque IP à 30 requêtes par fenêtre
    message:
        "Trop de requêtes créées depuis cette IP, veuillez réessayer après une minute",
});
app.use(limiter);

// Routes protégées
app.use("/api", authenticateToken, routes);

// Middleware de gestion des erreurs
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        res.status(500).json({ error: err.message });
    } else {
        res.status(500).json({ error: "Une erreur inconnue est survenue" });
    }
});

export default app;
