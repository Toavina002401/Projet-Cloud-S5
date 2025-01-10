# README: Docker Symfony Setup with Doctrine

## Overview
This guide describes how to set up a Symfony application in a Dockerized environment with PostgreSQL, including the ability to execute Doctrine commands (e.g., database creation, schema migrations) within the container.

## Prerequisites
- Docker and Docker Compose installed on your system.
- Symfony project ready in the working directory.

---

## 1. Docker Setup

---

## 2. Building and Starting Containers

Run the following commands to build and start the Docker containers:

```bash
docker-compose down  # Stop any existing containers
docker-compose up --build -d  # Build and start containers in detached mode
```

---

## 3. Interacting with Doctrine

### Access the PHP Container
To execute Symfony or Doctrine commands, access the PHP container:

```bash
docker exec -it container_php bash
```

### Doctrine Commands
Ensure the `DATABASE_URL` is correctly set in your `.env` file or in the `docker-compose.yml` environment section:

```
DATABASE_URL="pgsql://postgres:Belouh@db:5432/ProjetCloudS5"
```

#### Create the Database
Run the following command to create the database:

```bash
php bin/console doctrine:database:create 
```

#### Create the Database Schema
Generate and apply the schema:

```bash
php bin/console doctrine:schema:create
```

#### Run Migrations
Generate a migration file:

```bash
php bin/console make:migration
```

Apply the migrations:

```bash
php bin/console doctrine:migrations:migrate
```

---

## 4. Debugging and Rebuilding Containers

### Rebuild the PHP Container
If you make changes to the `Dockerfile`, rebuild the PHP container:

```bash
docker-compose up --build -d
```

### Logs
View logs to debug issues:

```bash
docker-compose logs -f
```

---

## 5. Useful Commands

- **Stop Containers:**
  ```bash
  docker-compose down
  ```

- **Start Containers:**
  ```bash
  docker-compose up -d
  ```

- **Access PHP Container:**
  ```bash
  docker exec -it container_php bash
  ```

- **Access PostgreSQL Container:**
  ```bash
  docker exec -it container_db bash
  ```

  
## ###############################################3
## ###############################################3
FrontOffice : Springboot : run " spring-boot:run " (avec initialisation du docker automatically)