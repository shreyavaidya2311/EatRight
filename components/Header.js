import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons, COLORS, FONTS } from "../constants";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { user, LogOut } = useAuth();
  return (
    <View
      style={{
        flexDirection: "row",
        height: 50,
        marginTop: Platform.OS == "android" ? 45 : 0,
      }}
    >
      <TouchableOpacity>
        <Image
          source={icons.profile}
          style={{
            width: 30,
            height: 30,
            marginLeft: 25,
            marginTop: 10,
            tintColor: COLORS.white,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
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
      <TouchableOpacity onPress={LogOut}>
        <Image
          source={icons.logout}
          style={{
            width: 25,
            height: 25,
            marginRight: 25,
            marginTop: 10,
            tintColor: COLORS.primary,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
