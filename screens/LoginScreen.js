import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";

import React from "react";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import { Button } from "react-native-paper";

import { icons, COLORS, FONTS } from "../constants";
import { loginImage } from "../constants/images";
const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={loginImage}
            style={{
              width: "80%",
              height: "70%",
              alignSelf: "center",
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 24,
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: 10,
            }}
          >
            Eat Right To Weigh Right
          </Text>
        </View>
        <View style={{ margin: 20 }}>
          <Text
            style={{
              color: "white",
              fontSize: 24,
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: 10,
            }}
          >
            Login to the app
          </Text>
          <Button
            icon="google"
            mode="contained"
            style={{
              width: "70%",
              alignSelf: "center",
            }}
            onPress={signInWithGoogle}
          >
            Sign In with Google
          </Button>
        </View>
      </View>
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
