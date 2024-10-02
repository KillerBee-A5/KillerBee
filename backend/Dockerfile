# Étape 1 : Construction
FROM node:16-alpine AS build

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Compiler TypeScript en JavaScript
RUN npm run build

# Étape 2 : Production
FROM node:16-alpine

WORKDIR /app

# Copier les fichiers compilés depuis l'étape de build
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./

# Installer les dépendances de production
RUN npm install --only=production

# Copier le script wait-for-it.sh dans l'image Docker
COPY --from=build /app/scripts/wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Donner les permissions d'exécution au script
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Exposer le port
EXPOSE 3000

# Commande pour démarrer l'application avec le script
CMD ["wait-for-it.sh", "db:1433", "--", "node", "dist/app.js"]