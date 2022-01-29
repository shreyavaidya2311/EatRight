import { Button, StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import { COLORS } from "../constants";
import Header from "../components/Header";

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text>Login to the app</Text>
      <Button
        title="Sign in with Google"
        color={COLORS.primary}
        onPress={signInWithGoogle}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});
