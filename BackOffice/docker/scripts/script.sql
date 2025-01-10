-- Migration 1 : Création des tables principales
CREATE TABLE activite (
    id SERIAL NOT NULL,
    utilisateur_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    date_action TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY (id)
);
CREATE INDEX IDX_B8755515FB88E14F ON activite (utilisateur_id);
COMMENT ON COLUMN activite.date_action IS '(DC2Type:datetime_immutable)';

CREATE TABLE pin (
    id SERIAL NOT NULL,
    utilisateur_id INT NOT NULL,
    code VARCHAR(8) NOT NULL,
    date_expiration TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    date_creation TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY (id)
);
CREATE INDEX IDX_B5852DF3FB88E14F ON pin (utilisateur_id);
COMMENT ON COLUMN pin.date_expiration IS '(DC2Type:datetime_immutable)';
COMMENT ON COLUMN pin.date_creation IS '(DC2Type:datetime_immutable)';

CREATE TABLE session (
    id SERIAL NOT NULL,
    utilisateur_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    date_expiration TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    date_creation TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
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
    date_creation TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    actif BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);
COMMENT ON COLUMN utilisateur.date_creation IS '(DC2Type:datetime_immutable)';

CREATE TABLE messenger_messages (
    id BIGSERIAL NOT NULL,
    body TEXT NOT NULL,
    headers TEXT NOT NULL,
    queue_name VARCHAR(190) NOT NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL,
    PRIMARY KEY (id)
);
CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name);
CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at);
CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at);
COMMENT ON COLUMN messenger_messages.created_at IS '(DC2Type:datetime_immutable)';
COMMENT ON COLUMN messenger_messages.available_at IS '(DC2Type:datetime_immutable)';
COMMENT ON COLUMN messenger_messages.delivered_at IS '(DC2Type:datetime_immutable)';

CREATE OR REPLACE FUNCTION notify_messenger_messages() RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify('messenger_messages', NEW.queue_name::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS notify_trigger ON messenger_messages;
CREATE TRIGGER notify_trigger AFTER INSERT OR UPDATE ON messenger_messages
FOR EACH ROW EXECUTE PROCEDURE notify_messenger_messages();

ALTER TABLE activite ADD CONSTRAINT FK_B8755515FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE pin ADD CONSTRAINT FK_B5852DF3FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE session ADD CONSTRAINT FK_D044D5D4FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Migration 2 : Création de la table tentatives_connexion
CREATE TABLE tentatives_connexion (
    id SERIAL NOT NULL,
    utilisateur_id INT NOT NULL,
    nb_tentatives INT NOT NULL,
    derniere_tentative TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY (id)
);
CREATE INDEX IDX_FB7960FBFB88E14F ON tentatives_connexion (utilisateur_id);
COMMENT ON COLUMN tentatives_connexion.derniere_tentative IS '(DC2Type:datetime_immutable)';

ALTER TABLE tentatives_connexion ADD CONSTRAINT FK_FB7960FBFB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) NOT DEFERRABLE INITIALLY IMMEDIATE;
