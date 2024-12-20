# Projet-Cloud-S5

# Emplacements des Livrables Demandés

1. **BackOffice**
   - Tous les projets ou API développés avec Symfony sont disponibles dans ce dossier.

2. **Dossier MCD**
   - Contient le modèle conceptuel de données pour visualiser la conception de notre base de données.

3. **Dossier Postman**
   - Contient la collection des API de notre projet, prête à être importée dans Postman.

4. **Todo-liste**
   - Retrouvez notre liste de tâches à l'aide de ce lien :
     [Accéder à la Todo-liste](https://docs.google.com/spreadsheets/d/1N9Cf7tioxJxChFK4XmtcgK6fhmd7zjx-Y6H9raRyyzc/edit?usp=sharing)

5. **Projet GitHub**
   - Le projet est accessible sur notre dépôt GitHub via ce lien :
     [Voir le Projet sur GitHub](https://github.com/Toavina002401/Projet-Cloud-S5)

6. **Documentation Swagger**
   - Pour accéder à la liste complète des API disponibles :
     1. Lancez le projet.
     2. Accédez à la documentation Swagger via l'URL suivante :
        [http://127.0.0.1:8000/doc](http://127.0.0.1:8000/doc).



# Les instructions pour lancer les applications (Projet-Cloud-S5).

## Scénarios d'utilisations
Ce guide explique comment configurer notre projet (Projet-Cloud-S5) dans un environnement Dockerisé avec PostgreSQL. 

---

## 1. Configuration de Docker
Les fichier `docker-compose.yml` et `Dockerfile` sont configurés pour un projet Symfony avec PostgreSQL dans le repertoire BackOffice/docker/.

---

## 2. Construction et démarrage des conteneurs
Exécutez les commandes suivantes pour construire et démarrer les conteneurs Docker (Execute cela dans le repertoire BackOffice/docker/):

```bash
docker-compose down  # Arrêter les conteneurs existants
docker-compose up --build -d  # Construire et démarrer les conteneurs en mode détaché
```

---

## 3. Interaction avec Doctrine

### Accéder au conteneur PHP
Pour exécuter des commandes Symfony ou Doctrine, accédez au conteneur PHP :

```bash
docker exec -it container_php bash
```

### Configuration du base
La variable `DATABASE_URL` est correctement définie dans notre fichier `.env` ou dans la section `environment` de notre fichier `docker-compose.yml` :

```env
DATABASE_URL="pgsql://postgres:Belouh@db:5432/ProjetCloudS5"
```

#### Créer la base de données
Exécutez la commande suivante pour créer la base de données :

```bash
php bin/console doctrine:database:create
```

#### Créer le schéma de la base de données
Générez et appliquez le schéma avec la commande :

```bash
php bin/console doctrine:schema:create
```

#### Exécuter les migrations

Générez un fichier de migration avec :

```bash
php bin/console make:migration
```

Appliquez les migrations en utilisant :

```bash
php bin/console doctrine:migrations:migrate
```

---

## 4. Démarrage du projet dans le docker

### Verification des conteneur
Assurer vous que les contenaire comme `container_db` et `container_php` marche bien sans erreur dans le docker. 


### Direction vers une navigateur
Pour demarrer maintenant le projet (Projet-Cloud-S5) tapez cette lien dans le navigateur :[http://127.0.0.1:8080](http://127.0.0.1:8080/)


