import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";

import React from "react";
import useAuth from "../hooks/useAuth";
import { Button } from "react-native-paper";

import { icons, COLORS, FONTS } from "../constants";
import { loginImage } from "../constants/images";
const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View>
          <View
            style={{
              flexDirection: "row",

              justifyContent: "center",
              alignItems: "center",
              marginTop: 130,
            }}
          >
            <Image
              source={icons.logo}
              style={{
                width: 42,
                height: 42,
                marginRight: 10,
              }}
            />

            <Text style={{ ...FONTS.largeTitle, color: COLORS.white }}>
              EatRight
            </Text>
          </View>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.primary,
              fontSize: 24,
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: 40,
              marginLeft: 15,
            }}
          >
            to weigh right
          </Text>
          <Image
            source={loginImage}
            style={{
              width: 350,
              height: 350,
              alignSelf: "center",
              marginBottom: 40,
            }}
          />
        </View>
        <View style={{ margin: 20 }}>
          <Text
            style={{
              ...FONTS.h2,
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
            color={COLORS.primary}
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
