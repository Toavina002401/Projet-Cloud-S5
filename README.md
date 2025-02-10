# Projet-Cloud-S5

# Emplacements des Livrables Demandés

1. **BackOffice**
   - Tous les projets ou API développés avec Symfony (Fournisseur d'identité) sont disponibles dans ce dossier.

2. **Dossier MCD**
   - Contient le modèle conceptuel de données pour visualiser la conception de notre base de données.

3. **Dossier Postman**
   - Contient la collection des API de notre projet, prête à être importée dans Postman.

4. **Todo-liste**
   - Retrouvez notre liste de tâches à l'aide de ce lien :
     [Accéder à la Todo-liste](https://docs.google.com/spreadsheets/d/1ZjZKRh_lusxVhIsYagb2nNsrxwHGTKNl_pJYIwL1uKA/edit?gid=1879296117#gid=1879296117)

5. **Projet GitHub**
   - Le projet est accessible sur notre dépôt GitHub via ce lien :
     [Voir le Projet sur GitHub](https://github.com/Toavina002401/Projet-Cloud-S5)

6. **Documentation Swagger**
   - Pour accéder à la liste complète des API disponibles :
     1. Lancez le projet.
     2. Accédez à la documentation Swagger via l'URL suivante :
        [http://127.0.0.1:8080/doc](http://127.0.0.1:8080/doc).



# Les instructions pour lancer les applications (Projet-Cloud-S5).

## Scénarios d'utilisations
Ce guide explique comment configurer notre projet (Projet-Cloud-S5) dans un environnement Dockerisé avec PostgreSQL. 

---

## 1. Configuration de Docker
Les fichier `docker-compose.yml` et `Dockerfile` sont configurés dans Symfony et dans le Spring-boot.

---

## 2. Creation d'une network
Exécutez cette commande pour creer une network pour l'interaction entre les conf docker du symfony et les conf docker du Spring boot

```bash
   docker network create it_network
```

## 3. Construction et démarrage des conteneurs(container_db et container_php)
Exécutez les commandes suivantes pour construire et démarrer les conteneurs Docker (Execute cela dans le repertoire BackOffice/docker/):

```bash
docker-compose down -v 
docker-compose up --build
```

---
### Verification du serveur symfony
Si cela marche sans erreur dans le logs alors verifier dans une navigateur que le serveur marche vraiment Tapez cette lien:
[http://127.0.0.1:8080/](http://127.0.0.1:8080/) `Le serveur symfony ` est déployer pour le port 8080. alors veuillez eteindre tous les autres serveur possible de le bloquer.

#### Les documentations des apis de ce fournisseur d'identité sont dans cette lien [http://127.0.0.1:8080/doc](http://127.0.0.1:8080/)


---
## 4. Démarrage du container qui contient les env pour spring-boot(springboot_container)
Exécutez les commandes suivantes pour construire et démarrer les conteneurs Docker (Execute cela dans le repertoire Web Application/Spring-boot/):

```bash
docker-compose down -v 
docker-compose up --build
```

### Verification du serveur spring-boot
Si cela marche sans erreur dans le logs alors verifier dans une navigateur que le serveur marche vraiment Tapez cette lien:
[http://127.0.0.1:8081/](http://127.0.0.1:8081/) `Le serveur spring-boot ` est déployer pour le port 8081. alors veuillez eteindre tous les autres serveur possible de le bloquer.


## Verification des conteneur
Assurer vous que les contenaire comme `container_db` et `container_php` et ` springboot_container` marche bien sans erreur dans le docker. 



