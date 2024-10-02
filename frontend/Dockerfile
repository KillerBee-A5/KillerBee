# Étape 1 : Construction
FROM node:16-alpine AS build

WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application avec Vite
RUN npm run build

# Exposer le port par défaut de Vite
EXPOSE 4173

# Démarrer l'application avec un serveur statique (servir les fichiers HTML/CSS/JS compilés)
CMD ["npm", "run", "serve"]
