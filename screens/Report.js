import { Button, StyleSheet, Text, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS } from "../constants";
import Header from "../components/Header";
import { Dimensions } from "react-native";
import { ProgressChart, BarChart } from "react-native-chart-kit";
import DatePicker from "react-native-datepicker";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Report = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [barData, setBarData] = useState();
  const [date, setDate] = useState("01-2022");
  const [calories, setCalories] = useState();
  const user = useAuth();
  let total_calories = 0;
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  function onSelectDate(element) {
    setDate(element);
  }
  useEffect(() => {
    axios
      .post(`${global.config.host}/api/food/get-food`, {
        email: user.user.email,
      })
      .then((res) => {
        let foodData = res.data.foods;
        let total_breakfast = 0;
        let total_lunch = 0;
        let total_snacks = 0;
        let total_dinner = 0;
        foodData.breakfast &&
          foodData.breakfast.map((item) => {
            if (item && item.date.substring(3, 10) === date) {
              total_breakfast = total_breakfast + parseInt(item.calories);
            }
          });
        foodData.lunch &&
          foodData.lunch.map((item) => {
            if (item && item.date.substring(3, 10) === date) {
              total_lunch = total_lunch + parseInt(item.calories);
            }
          });
        foodData.snacks &&
          foodData.snacks.map((item) => {
            if (item && item.date.substring(3, 10) === date) {
              total_snacks = total_snacks + parseInt(item.calories);
            }
          });
        foodData.dinner &&
          foodData.dinner.map((item) => {
            if (item && item.date.substring(3, 10) === date) {
              total_dinner = total_dinner + parseInt(item.calories);
            }
          });
        total_calories =
          total_breakfast + total_dinner + total_snacks + total_lunch;
        setCalories(total_calories);
        let meal_data = [];
        meal_data.push(total_breakfast);
        meal_data.push(total_lunch);
        meal_data.push(total_snacks);
        meal_data.push(total_dinner);
        const temp_bar_data = {
          labels: ["Breakfast", "Lunch", "Snacks", "Dinner"],
          datasets: [
            {
              data: meal_data,
            },
          ],
        };
        setBarData(temp_bar_data);
        let temp_data = foodData.breakfast && foodData.breakfast;
        let combined_data = temp_data.concat(
          foodData.lunch,
          foodData.snacks,
          foodData.dinner
        );
        let month_data = [];
        combined_data.map((item) => {
          if (item && item.date.substring(3, 10) === date) {
            month_data.push(item);
          }
        });

        let total_carbs = 0;
        let total_protein = 0;
        let total_fiber = 0;
        let total_fat = 0;
        let total_nutrients = 0;
        month_data.map((item) => {
          total_carbs = total_carbs + parseInt(item.carbohydrates);
          total_protein = total_protein + parseInt(item.protein);
          total_fat = total_carbs + parseInt(item.fat);
          total_fiber = total_carbs + parseInt(item.fiber);
        });
        total_nutrients = total_carbs + total_protein + total_fiber + total_fat;
        let nutrient_data = [];
        nutrient_data.push(
          Math.round((total_protein / total_nutrients) * 10) / 10
        );
        nutrient_data.push(
          Math.round((total_carbs / total_nutrients) * 10) / 10
        );
        nutrient_data.push(Math.round((total_fat / total_nutrients) * 10) / 10);
        nutrient_data.push(
          Math.round((total_fiber / total_nutrients) * 10) / 10
        );

        let nutrient_label = ["Protein", "Carbs", "Fat", "Fiber"];
        const new_data = {
          labels: nutrient_label,
          data: nutrient_data,
        };
        setData(new_data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {loading ? (
        <></>
      ) : (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            <DatePicker
              style={{ width: 200 }}
              date={date}
              mode="date"
              format="MM-YYYY"
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
              onDateChange={(value) => onSelectDate(value)}
            />
          </View>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View>
              <AnimatedCircularProgress
                size={120}
                width={15}
                fill={calories}
                duration={600}
                tintColor={COLORS.primary}
                lineCap="round"
                style={{ margin: 40 }}
              >
                {(fill) => (
                  <>
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                      {Math.round(fill)}
                    </Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.white }}>
                      calories
                    </Text>
                  </>
                )}
              </AnimatedCircularProgress>
            </View>

            <View>
              <AnimatedCircularProgress
                size={120}
                width={15}
                fill={calories * 1.3 + Math.random() + Math.random()}
                duration={600}
                tintColor={COLORS.primary}
                lineCap="round"
                style={{ margin: 40 }}
              >
                {(fill) => (
                  <>
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                      {Math.round(fill)}
                    </Text>
                    <Text style={{ ...FONTS.body4, color: COLORS.white }}>
                      calories
                    </Text>
                  </>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>

          <ProgressChart
            data={data}
            width={screenWidth}
            height={210}
            strokeWidth={16}
            radius={18}
            chartConfig={chartConfig}
            hideLegend={false}
          />
          <BarChart
            data={barData}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});
