### Table of Contents CampingBackend

- [Description](#description)
- [Swagger](#swagger)
- [Technologies](#how-to-use)
- [Requirements](#Requirements)
- [How To Use](#how-to-use)
- [License](#license)
- [Author Info](#author-info)

---

## Description

CampingBackend c'est le serveur de notre application mobile [Android/iOS], en nous permettant de stocker les données des utilisateurs, des évènement avec leur appréciation et les commentaires des utilisateurs.

#### Swagger

- Si on utilise la commande npm start app.js lien : http://localhost:3000/Api-docs/
- Si on utilise Docker lien : http://localhost:3005/Api-docs/

---

#### Technologies

- Node  
- Express
- Docker

---

## Requirements

* Node 8
* Git

## How To Use
clone the repo and install the dependencies :
- clone https://github.com/walid009/CampingBackend.git
- npm install

Node :
- brew services start mongodb-community@4.4
- nodemon app.js
- lancer le projet avec la commande: npm start app.js

Docker:
- lancer le projet de facon detacher avec la commande : docker-compose up -d
- arrete le projet avec la commande : docker-compose down IdContainer

## License

MIT License

## Author Info

- chekir walid
- bellili mohamed amine
