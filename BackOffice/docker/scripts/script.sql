

-- Création de la table activite
CREATE TABLE activite (
    id SERIAL NOT NULL,
    utilisateur_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    date_action TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY(id)
);

-- Création de l'index sur utilisateur_id dans activite
CREATE INDEX IDX_B8755515FB88E14F ON activite (utilisateur_id);

-- Ajout d'un commentaire sur la colonne date_action dans activite
COMMENT ON COLUMN activite.date_action IS '(DC2Type:datetime_immutable)';

-- Création de la table pin
CREATE TABLE pin (
    id SERIAL NOT NULL,
    utilisateur_id INT NOT NULL,
    code VARCHAR(8) NOT NULL,
    date_expiration TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    date_creation TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY(id)
);

-- Création de l'index sur utilisateur_id dans pin
CREATE INDEX IDX_B5852DF3FB88E14F ON pin (utilisateur_id);

-- Ajout de commentaires sur les colonnes date_expiration et date_creation dans pin
COMMENT ON COLUMN pin.date_expiration IS '(DC2Type:datetime_immutable)';
COMMENT ON COLUMN pin.date_creation IS '(DC2Type:datetime_immutable)';

-- Création de la table session
CREATE TABLE session (
    id SERIAL NOT NULL,
    utilisateur_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    date_expiration TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    date_creation TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY(id)
);

-- Création de l'index sur utilisateur_id dans session
CREATE INDEX IDX_D044D5D4FB88E14F ON session (utilisateur_id);

-- Ajout de commentaires sur les colonnes date_expiration et date_creation dans session
COMMENT ON COLUMN session.date_expiration IS '(DC2Type:datetime_immutable)';
COMMENT ON COLUMN session.date_creation IS '(DC2Type:datetime_immutable)';

-- Création de la table utilisateur
CREATE TABLE utilisateur (
    id SERIAL NOT NULL,
    pseudo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    date_creation TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    actif BOOLEAN NOT NULL,
    PRIMARY KEY(id)
);

-- Ajout d'un commentaire sur la colonne date_creation dans utilisateur
COMMENT ON COLUMN utilisateur.date_creation IS '(DC2Type:datetime_immutable)';

-- Création de la table messenger_messages
CREATE TABLE messenger_messages (
    id BIGSERIAL NOT NULL,
    body TEXT NOT NULL,
    headers TEXT NOT NULL,
    queue_name VARCHAR(190) NOT NULL,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL,
    PRIMARY KEY(id)
);

-- Création des indexes sur messenger_messages
CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name);
CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at);
CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at);

-- Ajout de commentaires sur les colonnes dans messenger_messages
COMMENT ON COLUMN messenger_messages.created_at IS '(DC2Type:datetime_immutable)';
COMMENT ON COLUMN messenger_messages.available_at IS '(DC2Type:datetime_immutable)';
COMMENT ON COLUMN messenger_messages.delivered_at IS '(DC2Type:datetime_immutable)';

-- Création de la fonction notify_messenger_messages
CREATE OR REPLACE FUNCTION notify_messenger_messages() RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify('messenger_messages', NEW.queue_name::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Création du trigger notify_trigger sur messenger_messages
DROP TRIGGER IF EXISTS notify_trigger ON messenger_messages;
CREATE TRIGGER notify_trigger
AFTER INSERT OR UPDATE ON messenger_messages
FOR EACH ROW
EXECUTE PROCEDURE notify_messenger_messages();

-- Création des contraintes de clé étrangère
ALTER TABLE activite ADD CONSTRAINT FK_B8755515FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE pin ADD CONSTRAINT FK_B5852DF3FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE session ADD CONSTRAINT FK_D044D5D4FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) NOT DEFERRABLE INITIALLY IMMEDIATE;
