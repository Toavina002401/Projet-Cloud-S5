import React from "react";
import { View, StyleSheet } from "react-native";
import LoginForm from "../components/LoginForm"; // Assuming you saved the LoginForm in the components folder

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1a1a1a", // Match your app background color
  },
});

export default LoginScreen;
