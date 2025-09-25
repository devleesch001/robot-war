# Robot Wars 🤖⚔️

Une application complète de gestion de tournois de robots avec système de combats, statistiques et épreuves personnalisées.

## 📋 Description

Robot Wars est une plateforme de gestion de tournois de robots comprenant :

- **Gestion des robots** : Création, modification et suivi des robots participants
- **Système de tournois** : Organisation de tournois avec brackets automatiques
- **Combats en temps réel** : Interface de gestion des combats avec chronométrage
- **Épreuves spécialisées** : Parcours, dégâts, mêlée générale
- **Statistiques avancées** : Suivi des performances, classements et historique
- **Interface d'administration** : Panneau de contrôle pour les organisateurs

## 🏗️ Architecture

Le projet est composé de deux parties principales :

### Backend (API)
- **Framework** : Node.js + Express
- **Base de données** : MongoDB avec Mongoose
- **Port** : 3001
- **Fonctionnalités** :
  - API RESTful pour la gestion des robots, tournois et combats
  - Calcul automatique des statistiques
  - Gestion des épreuves et classements

### Frontend (UI)
- **Framework** : React 18 + TypeScript
- **UI Library** : Ant Design
- **Routing** : React Router v6
- **Port** : 3000 (développement), 80 (production)
- **Fonctionnalités** :
  - Interface utilisateur responsive
  - Visualisation des tournois en temps réel
  - Gestion administrative des combats

## 🚀 Installation et Configuration

### Prérequis

- Node.js 18+ et npm 8.6+
- MongoDB (ou Docker pour utiliser le docker-compose)
- Git

### Installation rapide avec Docker

1. **Cloner le projet**
```bash
git clone https://github.com/devleesch001/robot-war.git
cd robot-war
```

2. **Lancer la base de données**
```bash
cd api
docker-compose up -d
```

3. **Installer et lancer l'API**
```bash
# Dans le dossier api/
npm install
npm run dev  # Mode développement
# ou
npm start    # Mode production
```

4. **Installer et lancer l'interface**
```bash
# Dans le dossier ui/
npm install
npm start    # Mode développement
# ou
npm run build && serve -s build -l 80  # Mode production
```

### Installation manuelle

#### Backend (API)

```bash
cd api
npm install

# Configurer MongoDB (par défaut : mongodb://root:example@127.0.0.1:27017)
# Modifier src/services/MongooseService.js si nécessaire

npm run dev  # Développement avec nodemon
# ou
npm start   # Production
```

#### Frontend (UI)

```bash
cd ui
npm install
npm start   # Démarre sur http://localhost:3000
```

## 🎮 Utilisation

### Interface Utilisateur

1. **Page d'accueil** (`/`) : Vue d'ensemble des combats, tournois et robots
2. **Création de tournoi** (`/tournament`) : Organiser un nouveau tournoi
3. **Administration** (`/admin/back-office`) : Panneau de contrôle administrateur
4. **Visualisation des combats** (`/fights/:fightId`) : Suivi en temps réel des combats

### Fonctionnalités principales

#### Gestion des Robots
- Créer et modifier des robots
- Consulter les statistiques (victoires, défaites, égalités, scores)
- Historique des participations

#### Tournois
- Création de tournois avec sélection des participants
- Génération automatique des brackets
- Suivi en temps réel de l'avancement

#### Combats
- Interface de chronométrage
- Sélection du vainqueur
- Enregistrement automatique des résultats

#### Épreuves Spécialisées
- **Parcours** : Épreuve de navigation et précision
- **Dégâts** : Épreuve de combat destructif
- **Mêlée générale** : Combat multiple avec classement

## 📊 Modèles de Données

### Robot
```javascript
{
  name: String (unique, required),
  stat: String,
  timestamps: true
}
```

### Combat
```javascript
{
  fighters: [ObjectId], // Références vers Robot
  win: ObjectId,        // Robot vainqueur
  winners: Mixed,       // Classement pour mêlées
  nextfight: ObjectId,  // Combat suivant
  label: String,
  status: String,
  startedAt: Date,
  duration: Number
}
```

### Tournoi
```javascript
{
  name: String (required),
  fighters: [ObjectId], // Robots participants
  fights: [ObjectId],   // Combats du tournoi
  win: ObjectId,        // Robot vainqueur
  status: String (required)
}
```

### Épreuve (Ordeal)
```javascript
{
  robots: [ObjectId],   // Robots participants
  score: Mixed,         // Scores par robot
  type: String,         // PARCOURS, DEGATS, etc.
  status: String,
  startedAt: Date,
  duration: Number
}
```

## 🔧 API Endpoints

### Robots
- `GET /api/robot` - Liste tous les robots
- `GET /api/robot?name=NomRobot` - Robot par nom
- `GET /api/robot?id=RobotId` - Robot par ID avec statistiques
- `POST /api/robot` - Créer un robot
- `PUT /api/robot/:id` - Modifier un robot
- `DELETE /api/robot/:id` - Supprimer un robot

### Combats
- `GET /api/battle` - Liste des combats
- `POST /api/battle` - Créer un combat
- `PUT /api/battle/:id` - Modifier un combat

### Tournois
- `GET /api/tournament` - Liste des tournois
- `POST /api/tournament` - Créer un tournoi
- `PUT /api/tournament/:id` - Modifier un tournoi

### Épreuves
- `GET /api/ordeal` - Liste des épreuves
- `POST /api/ordeal` - Créer une épreuve
- `PUT /api/ordeal/:id` - Modifier une épreuve

### Statistiques
- `GET /api/robot/stat/:id` - Statistiques détaillées d'un robot

## 🐳 Déploiement Docker

### API + MongoDB

```bash
cd api
docker-compose up -d  # Lance MongoDB + Mongo Express
docker build -t robot-war-api .
docker run -p 3001:3001 robot-war-api
```

### Interface utilisateur

```bash
cd ui
docker build -t robot-war-ui .
docker run -p 80:80 robot-war-ui
```

### Accès aux services

- **Application** : http://localhost:3000 (dev) ou http://localhost:80 (prod)
- **API** : http://localhost:3001
- **MongoDB Admin** : http://localhost:8081 (root/example)
- **Base de données** : mongodb://root:example@localhost:27017

## 🛠️ Développement

### Structure du projet

```
robot-war/
├── api/                 # Backend Node.js
│   ├── src/
│   │   ├── api/        # Routes et contrôleurs
│   │   ├── models/     # Modèles Mongoose
│   │   ├── services/   # Logique métier
│   │   └── index.js    # Point d'entrée
│   ├── Dockerfile
│   └── docker-compose.yml
├── ui/                  # Frontend React
│   ├── src/
│   │   ├── api/        # Services API
│   │   ├── components/ # Composants React
│   │   └── App.tsx     # Application principale
│   └── Dockerfile
└── LICENSE
```

### Scripts utiles

#### API
```bash
npm run dev     # Développement avec nodemon
npm start       # Production
npm run lint    # Vérification du code
```

#### UI
```bash
npm start       # Serveur de développement
npm run build   # Build de production
npm test        # Tests
npm run lint    # Vérification du code
```

### Qualité du code

Le projet utilise :
- **ESLint** pour la vérification du code
- **Prettier** pour le formatage
- **TypeScript** pour le frontend (typage statique)

## 📈 Système de Points

Le système de scoring suit ces règles :
- **Victoire en combat** : +4 points
- **Égalité en combat** : +2 points
- **1ère place en mêlée** : +10 points
- **2ème place en mêlée** : +5 points
- **3ème place en mêlée** : +3 points
- **Épreuves spécialisées** : Points selon performance

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

### Guidelines de développement

- Respecter les conventions de nommage existantes
- Ajouter des tests pour les nouvelles fonctionnalités
- Documenter les nouvelles API
- Utiliser les outils de linting configurés

## 📄 Licence

Ce projet est sous licence GNU Affero General Public License v3.0 (AGPL-3.0).

Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Auteurs

- **ADEFJT** - Développement initial

## 🐛 Signaler un Bug

Pour signaler un bug ou proposer une amélioration, veuillez créer une [issue](https://github.com/devleesch001/robot-war/issues) sur GitHub.

## 📞 Support

Pour toute question ou support technique, n'hésitez pas à ouvrir une discussion dans l'onglet [Discussions](https://github.com/devleesch001/robot-war/discussions) du projet.

---

⚡ **Robot Wars** - Que le meilleur robot gagne ! 🏆