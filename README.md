# Projet KillerBee

## Table des Matières

- [Description](#description)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
  - [Prérequis](#prérequis)
  - [Cloner le Dépôt](#cloner-le-dépôt)
  - [Configuration des Variables d'Environnement](#configuration-des-variables-denvironnement)
  - [Démarrer les Services avec Docker](#démarrer-les-services-avec-docker)
- [Usage](#usage)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Endpoints API](#endpoints-api)
  - [FRIZBEE](#frizbee)
  - [Utilisateurs](#utilisateurs)
- [Tests](#tests)
  - [Backend](#backend)
  - [Frontend](#frontend)

## Description

**KillerBee** est une application full-stack conçue pour gérer et suivre les FRIZBEE (ou tout autre entité pertinente). Elle comprend un frontend développé avec React, un backend en TypeScript utilisant Express et MSSQL, et une infrastructure orchestrée avec Docker et Docker Compose. Traefik est utilisé comme reverse proxy pour gérer les requêtes HTTP et HTTPS, assurant une communication sécurisée entre les différents services.

## Technologies Utilisées

- **Frontend :**
  - React
  - React Admin
  - TypeScript
  - Vite
  - Axios
  - Material UI
  - Jest & React Testing Library

- **Backend :**
  - Node.js
  - Express
  - TypeScript
  - MSSQL
  - Joi (pour la validation)
  - Jest (pour les tests)

- **Infrastructure :**
  - Docker
  - Docker Compose
  - Traefik
  - Nginx
  - MSSQL Server

## Installation

### Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### Cloner le Dépôt

Clonez le dépôt GitHub sur votre machine locale :

```bash
git clone https://github.com/KillerBee-A5/KillerBee.git
cd KillerBee
```

### Configuration des Variables d'Environnement

Créez un fichier `.env` à la racine du projet en copiant le fichier d'exemple et en remplissant les valeurs appropriées.

```bash
cp .env.example .env
```

### Démarrer les Services avec Docker

À la racine du projet, exécutez la commande suivante pour construire et démarrer tous les services :

```bash
docker-compose up -d --build
```

Cette commande va :

- Construire les images Docker pour le frontend et le backend.
- Démarrer les conteneurs Traefik, Frontend, Backend, Nginx, et MSSQL Server.
- Configurer Traefik comme reverse proxy pour gérer les routes HTTP et HTTPS.oxy

## Usage

### Frontend

Le frontend est une application React qui interagit avec le backend via les endpoints API.

#### Accéder au Frontend

Une fois les services démarrés, le frontend devrait être accessible à l'adresse suivante :

```bash
http://localhost/frontend
```

#### Scripts Disponibles

Si vous souhaitez développer ou tester le frontend localement sans Docker :

```bash
cd frontend
npm install
npm start    # Démarre le serveur de développement
npm run build  # Construit l'application pour la production
```

### Backend

Le backend est une application Express en TypeScript qui expose une API RESTful pour gérer les FRIZBEE.

#### Accéder au Backend

Le backend est accessible à l'adresse suivante :

```bash
http://localhost/api
```

#### Scripts Disponibles

Si vous souhaitez développer ou tester le backend localement sans Docker :

```bash
cd backend
npm install
npm run dev    # Démarre le serveur en mode développement avec rechargement automatique
npm run build  # Compile le TypeScript en JavaScript
npm start      # Démarre le serveur en production
```

## Endpoints API

### FRIZBEE

- **GET /frizbee** : Récupère tous les FRIZBEE

```bash
curl http://localhost/api/frizbee
```

- **GET /frizbee/:id** : Récupère un FRIZBEE par ID

```bash
curl http://localhost/api/frizbee/1
```

- **POST /frizbee** : Crée un nouveau FRIZBEE

```bash
curl -X POST http://localhost/api/frizbee \
     -H "Content-Type: application/json" \
     -d '{
           "NOM_FRIZBEE": "Frizbee A",
           "DESCRIPTION_FRIZBEE": "Description A",
           "PUHT": 10.5,
           "STOCK": 100,
           "ID_PROCEDE": 1,
           "ID_GAMME": 2,
           "ORDRE": 1
         }'
```

- **PUT /frizbee/:id** : Mettre à jour un FRIZBEE

```bash
curl -X PUT http://localhost/api/frizbee/1 \
     -H "Content-Type: application/json" \
     -d '{
           "STOCK": 150
         }'
```

- **DELETE /frizbee/:id** : Supprime un FRIZBEE

```bash
curl -X DELETE http://localhost/api/frizbee/1
```

### Utilisateurs

à compléter

## Tests

### Backend

Le backend utilise Jest pour les tests unitaires et d'intégration.

#### Exécuter les Tests

```bash
cd backend
npm test
```

### Frontend

Le frontend utilise Jest et React Testing Library pour les tests des composants React.

#### Exécuter les Tests

```bash
cd frontend
npm test
```
