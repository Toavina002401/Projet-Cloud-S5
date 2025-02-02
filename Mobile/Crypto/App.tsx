import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import CryptoScreen from "./src/screens/CryptoScreen";  // Importation de CryptoScreen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: "Connexion" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerTitle: "Inscription" }} />
        <Stack.Screen name="Crypto" component={CryptoScreen} options={{ headerTitle: "Crypto" }} />  {/* Ajout du screen Crypto */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coucou Tout le Monde</Text>

      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>S'inscrire</Text>
      </TouchableOpacity>

      {/* Ajout du bouton pour naviguer vers Crypto */}
      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate("Crypto")}>
        <Text style={styles.linkText}>Voir les Cryptos</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  linkButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
