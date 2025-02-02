import React from "react";
import { View, StyleSheet } from "react-native";
import RegisterForm from "../components/RegisterForm"; // Assuming you saved the RegisterForm in the components folder

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <RegisterForm />
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

export default RegisterScreen;
