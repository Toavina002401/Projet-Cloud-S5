# Utilisation de l'image PHP avec Apache
FROM php:8.2-apache

# Mise à jour des paquets et installation des dépendances nécessaires
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Installation de Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Activation du mod_rewrite pour Apache
RUN a2enmod rewrite

# Définir les variables d'environnement pour Symfony
ENV APP_ENV=prod
ENV APP_DEBUG=0

# Définir le répertoire de travail par défaut
WORKDIR /var/www/html

# Copier le code source dans le conteneur
COPY . /var/www/html/

# Configurer Apache pour pointer vers le répertoire public de Symfony
RUN echo '<VirtualHost *:80>\n\
    ServerName localhost\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html/public>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
    ErrorLog ${APACHE_LOG_DIR}/error.log\n\
    CustomLog ${APACHE_LOG_DIR}/access.log combined\n\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf

# Installer les dépendances du projet Symfony en mode production
RUN composer install --no-dev --optimize-autoloader --classmap-authoritative

# Définir les permissions pour le cache/logs de Symfony
RUN chown -R www-data:www-data /var/www/html/var

# Exposer le port 80
EXPOSE 80

