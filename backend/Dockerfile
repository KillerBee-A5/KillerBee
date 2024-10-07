# Étape 1 : Construction
FROM node:18-alpine AS build

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
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers compilés depuis l'étape de build
COPY --from=build /app/dist ./dist

# Copier uniquement les dépendances de production
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./

RUN npm install --only=production

# Copier le script wait-for-it.sh
COPY --from=build /app/scripts/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Exposer le port
EXPOSE 3000

# Commande pour démarrer l'application avec le script
CMD ["wait-for-it.sh", "db:1433", "--", "node", "dist/server.js"]