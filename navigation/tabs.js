import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import Svg, { Path } from "react-native-svg";
import { isIphoneX } from "react-native-iphone-x-helper";

import { Home } from "../screens";

import { COLORS, icons } from "../constants";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ flexDirection: "row", position: "absolute", top: 0 }}>
          <View style={{ flex: 1, backgroundColor: COLORS.primary }}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.primary}
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: COLORS.primary }}></View>
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            borderRadius: 40,
            backgroundColor: COLORS.black,
          }}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: COLORS.primary,
        }}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = (props) => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 25,
            backgroundColor: COLORS.black,
          }}
        ></View>
        <BottomTabBar {...props.props} />
      </View>
    );
  } else {
    return <BottomTabBar {...props.props} />;
  }
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 0,
          height: 100,
        },
      }}
      tabBar={(props) => <CustomTabBar props={props} />}
    >
      <Tab.Screen
        name="HomePage"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.home}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? COLORS.primary : COLORS.black,
                marginBottom: focused ? 0 : 15,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Report"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.report}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? COLORS.primary : COLORS.black,
                marginBottom: focused ? 0 : 15,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Camera"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.camera}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? COLORS.primary : COLORS.black,
                marginBottom: focused ? 0 : 15,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Friends"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.friends}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? COLORS.primary : COLORS.black,
                marginBottom: focused ? 0 : 15,
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
