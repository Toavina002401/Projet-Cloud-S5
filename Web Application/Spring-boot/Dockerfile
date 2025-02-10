# Utilise une image Maven pour compiler et packager l'application
FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app

COPY . .

# Compile l'application avec Maven
RUN mvn clean package -DskipTests

# Utilise l'image OpenJDK pour exécuter l'application
FROM openjdk:17-jdk-slim

# Répertoire où l'application sera copiée
WORKDIR /app

# Copie le fichier JAR généré dans le conteneur
COPY --from=build /app/target/*.jar app.jar

# Expose le port de l'application Spring Boot
EXPOSE 8081

# Commande pour démarrer l'application Spring Boot
ENTRYPOINT ["java", "-jar", "/app/app.jar"]