# Welcome to my project (REACT-)


# Build gradle to apk : ./gradlew assembleDebug  


Pour utiliser l'application sur un appareil mobile ou un émulateur, voici les étapes à suivre :

Faites un git pull du projet
Exécutez npm install pour installer les dépendances
Pour iOS (nécessite un Mac avec Xcode) :
Exécutez npx cap add ios
Puis npx cap update ios
Pour Android (nécessite Android Studio) :
Exécutez npx cap add android
Puis npx cap update android
Construisez le projet avec npm run build
Synchronisez avec npx cap sync
Pour lancer l'application :
iOS : npx cap open ios
Android : npx cap open android
L'application conserve toutes ses fonctionnalités existantes mais peut maintenant être exécutée comme une application mobile native sur iOS et Android.


# REHEFA generer ilay npx sns ...
./gradlew assembleDebug

# ###################### Cas Mr Rojo # #######################

Lancer sur plusieur plateforme : 

Android :
Dans le fichier android/build.gradle, vous pouvez définir la version minimale d'Android supportée par votre application.

Exemple :

# android {
  #  defaultConfig {
   #     minSdkVersion 21 // Version minimale supportée (Android 5.0)
   #     targetSdkVersion 33 // Version cible (la plus récente)
   #         }
# }



