drop database "ProjetCloudS5";

create database "ProjetCloudS5";
\c "ProjetCloudS5"


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


-- Insertion d'un utilisateur
INSERT INTO Utilisateur (pseudo, email, mdp, date_creation, actif)
VALUES 
('utilisateur1', 'utilisateur1@example.com', 'motdepasse123', '2025-01-10 09:00:00', TRUE);


-- Insertion d'une session pour l'utilisateur
INSERT INTO Session (token, date_expiration, date_creation, id_utilisateur)
VALUES 
('token_123456', '2025-01-12 09:00:00', '2025-01-10 09:00:00', 1);


-- Insertion d'activités pour l'utilisateur
INSERT INTO Activite (action, date_action, id_utilisateur)
VALUES 
('Connexion', '2025-01-10 09:05:00', 1),
('Achat de crypto', '2025-01-10 09:15:00', 1);


-- Insertion d'un code PIN pour l'utilisateur
INSERT INTO PIN (code, date_expiration, date_creation, id_utilisateur)
VALUES 
('12345678', '2025-01-12 09:00:00', '2025-01-10 09:00:00', 1);


-- Insertion de tentatives de connexion pour l'utilisateur
INSERT INTO TentativesConnexion (nb_tentatives, derniere_tentative, id_utilisateur)
VALUES 
(3, '2025-01-10 09:10:00', 1);


-- Insertion de cryptomonnaies
INSERT INTO Cryptomonnaies (nom, symbole)
VALUES 
('Bitcoin', 'BTC'),
('Ethereum', 'ETH'),
('Litecoin', 'LTC');


-- Insertion d'un portefeuille pour l'utilisateur
INSERT INTO Portefeuille (date_creation, solde_fonds, id_utilisateur)
VALUES 
('2025-01-10 09:00:00', 1000.00, 1);


-- Insertion d'historique des fonds pour l'utilisateur
INSERT INTO HistoriqueFonds (date_transaction, montant, type, id_portefeuille)
VALUES 
('2025-01-10 09:05:00', 500.00, 'Dépôt', 1),
('2025-01-10 09:15:00', 200.00, 'Achat', 1);


-- Insertion des soldes de cryptomonnaies dans le portefeuille
INSERT INTO SoldeCrypto (quantite_crypto, dernier_maj, id_cryptomonnaies, id_portefeuille)
VALUES 
(0.5, '2025-01-10 09:10:00', 1, 1),  -- 0.5 BTC dans le portefeuille 1
(10.0, '2025-01-10 09:10:00', 2, 1),  -- 10.0 ETH dans le portefeuille 1
(2.5, '2025-01-10 09:10:00', 3, 1);  -- 2.5 LTC dans le portefeuille 1


