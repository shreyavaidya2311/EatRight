import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Platform,
  Text,
  Button,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { mealData, foodData } from "../data/foodData";
import { icons, SIZES, COLORS, FONTS } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome5";
import useAuth from "../hooks/useAuth";

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState(mealData);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { user, LogOut } = useAuth();
  useEffect(() => {
    let temp_data = foodData.breakfast;
    let combined_data = temp_data.concat(
      foodData.lunch,
      foodData.snacks,
      foodData.dinner
    );
    setData(combined_data);
  }, []);

  function onSelectCategory(category) {
    setSelectedCategory(category);
    let temp_object = { ...foodData };
    setData(temp_object[category.label]);
  }

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          marginTop: Platform.OS == "android" ? 45 : 0,
        }}
      >
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
            Food Logger
          </Text>
        </View>
      </View>
    );
  }

  function renderFoodList() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity>
          <View style={{ margin: 10 }}>
            <Image
              source={item.photo}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 200,
                borderRadius: SIZES.radius,
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                height: 70,
                backgroundColor: COLORS.black,
                borderColor: COLORS.primary,
                borderWidth: 2,
                width: SIZES.width * 0.6,
                padding: 10,
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                ...styles.shadow,
              }}
            >
              <Text style={{ ...FONTS.body2, color: COLORS.primary }}>
                {item.name}
              </Text>
              <Text style={{ ...FONTS.h4, color: COLORS.white }}>
                {" "}
                <Icon name="fire" size={15} color={COLORS.white} />{" "}
                {item.calories}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }

  function renderMainCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            marginLeft: SIZES.padding,
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id === item.id ? COLORS.primary : COLORS.black,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}
        >
          <View
            style={{
              backgroundColor: COLORS.black,
              width: 55,
              height: 55,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                height: 35,
                width: 35,
              }}
            />
          </View>
          <Text
            style={{
              color:
                selectedCategory?.id === item.id ? COLORS.black : COLORS.white,
              marginTop: SIZES.padding,

              fontWeight: "bold",
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <FlatList
          justifyContent="center"
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderFoodList()}
      <Button title="Log Out" onPress={LogOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
export default Home;
