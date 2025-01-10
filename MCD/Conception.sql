drop database ProjetCloudS5;
create database ProjetCloudS5;
\c ProjetCloudS5


CREATE TABLE Utilisateur(
   id SERIAL,
   pseudo VARCHAR(255)  NOT NULL,
   email VARCHAR(255)  NOT NULL,
   mdp VARCHAR(255)  NOT NULL,
   date_creation TIMESTAMP NOT NULL,
   actif BOOLEAN NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE Session(
   id SERIAL,
   token VARCHAR(255)  NOT NULL,
   date_expiration TIMESTAMP NOT NULL,
   date_creation TIMESTAMP NOT NULL,
   id_utilisateur INTEGER NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(token),
   FOREIGN KEY(id_utilisateur) REFERENCES Utilisateur(id)
);

CREATE TABLE Activite(
   id SERIAL,
   action VARCHAR(255) ,
   date_action TIMESTAMP NOT NULL,
   id_utilisateur INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_utilisateur) REFERENCES Utilisateur(id)
);

CREATE TABLE PIN(
   id SERIAL,
   code VARCHAR(8)  NOT NULL,
   date_expiration TIMESTAMP NOT NULL,
   date_creation TIMESTAMP NOT NULL,
   id_utilisateur INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_utilisateur) REFERENCES Utilisateur(id)
);

CREATE TABLE TentativesConnexion(
   id SERIAL,
   nb_tentatives INTEGER NOT NULL,
   derniere_tentative TIMESTAMP NOT NULL,
   id_utilisateur INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_utilisateur) REFERENCES Utilisateur(id)
);

CREATE TABLE Cryptomonnaies(
   id SERIAL,
   nom VARCHAR(50)  NOT NULL,
   symbole VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE Portefeuille(
   id SERIAL,
   date_creation TIMESTAMP NOT NULL,
   solde_fonds NUMERIC(20,6)  ,
   id_utilisateur INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_utilisateur) REFERENCES Utilisateur(id)
);

CREATE TABLE HistoriqueFonds(
   id SERIAL,
   date_transaction TIMESTAMP NOT NULL,
   montant NUMERIC(20,5)   NOT NULL,
   type VARCHAR(50) ,
   id_portefeuille INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_portefeuille) REFERENCES Portefeuille(id)
);

CREATE TABLE SoldeCrypto(
   id SERIAL,
   quantite_crypto NUMERIC(20,6)   NOT NULL,
   dernier_maj TIMESTAMP,
   id_cryptomonnaies INTEGER NOT NULL,
   id_portefeuille INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_cryptomonnaies) REFERENCES Cryptomonnaies(id),
   FOREIGN KEY(id_portefeuille) REFERENCES Portefeuille(id)
);
