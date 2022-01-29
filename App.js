import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { AuthProvider } from "./hooks/useAuth";
import StackNavigator from "./StackNavigator";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const App = () => {
  let [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      accent: "#f1c40f",
    },
  };
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
