<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241220030336 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE tentatives_connexion (id SERIAL NOT NULL, utilisateur_id INT NOT NULL, nb_tentatives INT NOT NULL, derniere_tentative TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_FB7960FBFB88E14F ON tentatives_connexion (utilisateur_id)');
        $this->addSql('COMMENT ON COLUMN tentatives_connexion.derniere_tentative IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE tentatives_connexion ADD CONSTRAINT FK_FB7960FBFB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE tentatives_connexion DROP CONSTRAINT FK_FB7960FBFB88E14F');
        $this->addSql('DROP TABLE tentatives_connexion');
    }
}
