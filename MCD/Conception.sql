CREATE TABLE Utilisateur(
   id SERIAL,
   pseudo VARCHAR(255)  NOT NULL,
   email VARCHAR(255)  NOT NULL,
   mdp VARCHAR(255)  NOT NULL,
   date_creation TIMESTAMP NOT NULL,
   actif BOOLEAN NOT NULL,
   PRIMARY KEY(id)
);

-- CREATE TABLE Roles(
--    id SERIAL,
--    description VARCHAR(255)  NOT NULL,
--    PRIMARY KEY(id)
-- );

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

-- CREATE TABLE Permission(
--    id SERIAL,
--    nom VARCHAR(255)  NOT NULL,
--    description VARCHAR(255)  NOT NULL,
--    PRIMARY KEY(id)
-- );

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


-- CREATE TABLE Utilisateur_role(
--    id_utilisateur INTEGER,
--    id_role INTEGER,
--    PRIMARY KEY(id_utilisateur, id_role),
--    FOREIGN KEY(id_utilisateur) REFERENCES Utilisateur(id),
--    FOREIGN KEY(id_role) REFERENCES Roles(id)
-- );

-- CREATE TABLE Permission_role(
--    id_role INTEGER,
--    id_permission INTEGER,
--    PRIMARY KEY(id_role, id_permission),
--    FOREIGN KEY(id_role) REFERENCES Roles(id),
--    FOREIGN KEY(id_permission) REFERENCES Permission(id)
-- );
