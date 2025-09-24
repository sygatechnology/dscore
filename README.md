# 🁫 SYGA Dômy Score Tracker

Une application web moderne pour compter et gérer les scores des parties de dominos.
Développée avec React + TypeScript (Vite + Tailwind), elle permet de suivre les parties, gérer les joueurs et conserver l’historique grâce au Local Storage du navigateur.

## 🚀 Fonctionnalités
⚙️ Paramètres d’une nouvelle partie

Choix du score cible : de 60 à 120 points.

Victoire si le score = jour actuel (par ex. si on est le `24` → le joueur qui atteint 24 pour la somme des restes d'un tour gagne).

Victoire si le score = `1`.

Possibilité de choisir uniquement `X` via le bouton d’insertion des points.

Définition du nombre de joueurs (jusqu’à 4, par défaut 3).

## 🕹️ Pendant la partie

Ajout des points pour chaque joueur.

Modification des derniers points insérés.

Suppression des derniers points insérés en cas d’erreur.

Indication du joueur qui a la main.

Renommer les joueurs à tout moment.

## 📜 Historique

Consultation de l’historique des parties terminées.

Stockage automatique en Local Storage du navigateur.

## 🛠️ Stack technique

React + TypeScript

Vite (pour un bundling rapide)

TailwindCSS (pour le style)

Local Storage (sauvegarde persistante des données côté navigateur)

### 📦 Installation & Lancement
1. Cloner le dépôt
   ```
   git clone https://github.com/sygatechnology/dscore.git
   cd dscore
   ```
2. Installer les dépendances
    ```
   npm install
   ```
3. Lancer en mode développement
    ```   
    npm run dev
    ```
👉 L’application sera accessible sur http://localhost:8080 (par défaut).

4. Build pour la production
    ```
   npm run build
   ```

### 💾 Persistance des données

Les scores et l’historique des parties sont enregistrés automatiquement dans le Local Storage.

Ainsi, même après un rechargement ou une fermeture du navigateur, les données restent disponibles.

🌐 [https://dscore.syga-technology.com](https://dscore.syga-technology.com)