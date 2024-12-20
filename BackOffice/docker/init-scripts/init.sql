-- Création des tables
CREATE TABLE activite (
    id SERIAL NOT NULL,
    utilisateur_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    date_action TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);
CREATE INDEX IDX_B8755515FB88E14F ON activite (utilisateur_id);
COMMENT ON COLUMN activite.date_action IS '(DC2Type:datetime_immutable)';

CREATE TABLE pin (
    id SERIAL NOT NULL,
    utilisateur_id INT NOT NULL,
    code VARCHAR(8) NOT NULL,
    date_expiration TIMESTAMP NOT NULL,
    date_creation TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);
CREATE INDEX IDX_B5852DF3FB88E14F ON pin (utilisateur_id);
COMMENT ON COLUMN pin.date_expiration IS '(DC2Type:datetime_immutable)';
COMMENT ON COLUMN pin.date_creation IS '(DC2Type:datetime_immutable)';

CREATE TABLE session (
    id SERIAL NOT NULL,
    utilisateur_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    date_expiration TIMESTAMP NOT NULL,
    date_creation TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);
CREATE INDEX IDX_D044D5D4FB88E14F ON session (utilisateur_id);
COMMENT ON COLUMN session.date_expiration IS '(DC2Type:datetime_immutable)';
COMMENT ON COLUMN session.date_creation IS '(DC2Type:datetime_immutable)';

CREATE TABLE utilisateur (
    id SERIAL NOT NULL,
    pseudo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    date_creation TIMESTAMP NOT NULL,
    actif BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);
COMMENT ON COLUMN utilisateur.date_creation IS '(DC2Type:datetime_immutable)';

CREATE TABLE messenger_messages (
    id BIGSERIAL NOT NULL,
    body TEXT NOT NULL,
    headers TEXT NOT NULL,
    queue_name VARCHAR(190) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    available_at TIMESTAMP NOT NULL,
    delivered_at TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (id)
);
CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name);
CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at);
CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at);
COMMENT ON COLUMN messenger_messages.created_at IS '(DC2Type:datetime_immutable)';
COMMENT ON COLUMN messenger_messages.available_at IS '(DC2Type:datetime_immutable)';
COMMENT ON COLUMN messenger_messages.delivered_at IS '(DC2Type:datetime_immutable)';


-- Ajout des contraintes de clé étrangère
ALTER TABLE activite ADD CONSTRAINT FK_B8755515FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE pin ADD CONSTRAINT FK_B5852DF3FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE session ADD CONSTRAINT FK_D044D5D4FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) NOT DEFERRABLE INITIALLY IMMEDIATE;


