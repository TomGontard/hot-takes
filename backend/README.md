# Hot Takes - Backend

Ce projet est une API REST sécurisée pour l'application Hot Takes.

## Installation

1. Clonez le projet :
   ```sh
   git clone https://github.com/TomGontard/hot-takes
   cd backend

2. Installez les dépendances :
    npm install

3. Créer un fichier .env dans le dossier backend et ajoutez :
    MONGO_URI=mongodb+srv://tomgontard:Xv4oCqoCQOIW5BSc@cluster0.zty2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    PORT=3000
    JWT_SECRET=secret

4. Démarrez le serveur :
    nodemon server