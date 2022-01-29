import { View, Text } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { createContext } from "react";
const AuthContext = createContext({});
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import { auth } from "../firebase";
import { AUTH_ANDROID_CLIENT_ID, AUTH_IOS_CLIENT_ID } from "@env";

const config = {
  androidClientId: AUTH_ANDROID_CLIENT_ID,
  iosClientId: AUTH_IOS_CLIENT_ID,
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};
export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );

  const LogOut = () => {
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    await Google.logInAsync(config)
      .then(async (loginResult) => {
        if (loginResult.type === "success") {
          const { accessToken, idToken } = loginResult;
          const credentials = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credentials);
        }
        return Promise.reject();
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        LogOut,
        signInWithGoogle,
      }}
    >
      {/* show splashscreen here */}
      {loadingInitial ? <Text>Loading</Text> : children}
    </AuthContext.Provider>
  );
};
export default function useAuth() {
  return useContext(AuthContext);
}
