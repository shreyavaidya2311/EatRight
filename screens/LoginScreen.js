import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <View>
      <Text>Login to the app</Text>
      <Button title="Sign in with Google" onPress={signInWithGoogle} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
