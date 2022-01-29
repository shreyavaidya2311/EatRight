import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { mealData } from "../data/foodData";
import { SIZES, COLORS, FONTS, images } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome5";
import Header from "../components/Header";
import DatePicker from "react-native-datepicker";
import useAuth from "../hooks/useAuth";

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState(mealData);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState("29-01-2022");
  const [open, setOpen] = useState(false);
  const [foodData, setFoodData] = useState({});
  const user = useAuth();

  useEffect(() => {
    axios
      .post(`${global.config.host}/api/food/get-food`, {
        email: user.user.email,
      })
      .then((res) => {
        let foodData = res.data.foods;
        let temp_data = foodData.breakfast;
        let combined_data = temp_data.concat(
          foodData.lunch,
          foodData.snacks,
          foodData.dinner
        );
        let today_data = [];
        combined_data.map((item) => {
          if (item.date === date) {
            today_data.push(item);
          }
        });
        setData(today_data);
        setFoodData(foodData);
      });
  }, [date]);

  function onSelectCategory(category) {
    setSelectedCategory(category);
    let temp_object = { ...foodData };
    let new_object = temp_object[category.label];
    let today_data = [];
    new_object.map((item) => {
      if (item.date === date) {
        today_data.push(item);
      }
    });
    setData(today_data);
  }

  function onSelectDate(element) {
    setDate(element);
  }

  function renderHeader() {
    return <Header />;
  }

  function renderFoodList() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate("Nutrition", { name: item.name })}
        >
          <View style={{ margin: 10 }}>
            <Image
              source={{ uri: item.photo }}
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
        <>
          <TouchableOpacity
            style={{
              marginLeft: SIZES.padding,
              padding: SIZES.padding,
              // paddingBottom: SIZES.padding,
              backgroundColor:
                selectedCategory?.id === item.id
                  ? COLORS.primary
                  : COLORS.black,
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
                  selectedCategory?.id === item.id
                    ? COLORS.black
                    : COLORS.white,
                marginTop: 10,

                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        </>
      );
    };

    return (
      <View style={{ padding: SIZES.padding }}>
        <FlatList
          justifyContent="center"
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <DatePicker
          style={{ width: 200 }}
          date={date}
          mode="date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              display: "none",
            },
            dateInput: {
              borderColor: COLORS.white,
              borderRadius: 10,
            },
            dateText: {
              ...FONTS.h2,
              color: COLORS.primary,
            },
          }}
          onDateChange={(value) => setDate(value)}
        />
      </View>
      {renderFoodList()}
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
