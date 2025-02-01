import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Button from "./common/Button";
import Card from "./common/Card";

const { width, height } = Dimensions.get("window"); // Récupère la taille de l'écran

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    // Handle registration logic here
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Sign up to get started with your account</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#888"
              secureTextEntry
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              placeholderTextColor="#888"
              secureTextEntry
            />
          </View>
          <Button style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Button>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.link}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: "#1a1a1a", // Légère couleur de fond plus claire
    },
    card: {
      width: width * 0.9, // 90% de la largeur de l'écran
      maxWidth: 450, // Largeur maximale
      padding: 24,
      borderRadius: 12,
      backgroundColor: "#333", // Fond de la carte
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },
    header: {
      marginBottom: 24,
      alignItems: "center",
    },
    title: {
      fontSize: 26, // Titre plus grand
      fontWeight: "bold",
      color: "#fff",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: "#bbb",
      textAlign: "center",
    },
    form: {
      width: "100%",
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: "#ddd",
      marginBottom: 6,
    },
    input: {
      width: "100%",
      padding: 14, // Plus de padding pour des champs plus grands
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#444", // Bordure plus sombre pour plus de contraste
      backgroundColor: "#222", // Fond plus sombre pour les champs
      color: "#fff",
      fontSize: 16, // Police plus grande
    },
    button: {
      marginTop: 16,
      backgroundColor: "#9376E0", // Couleur du bouton
      paddingVertical: 16, // Augmentation du padding vertical
      borderRadius: 8,
      alignItems: "center",
      width: width * 0.8, // Le bouton occupe 80% de la largeur de l'écran
    },
    buttonText: {
      color: "#fff",
      fontSize: 18, // Texte plus grand pour le bouton
      fontWeight: "bold",
    },
    footer: {
      marginTop: 24,
      flexDirection: "row",
      justifyContent: "center",
    },
    footerText: {
      fontSize: 14,
      color: "#aaa",
    },
    link: {
      color: "#9376E0",
      fontWeight: "bold",
    },
  });

export default RegisterForm;
