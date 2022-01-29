import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { COLORS, FONTS } from "../constants";
import { FOOD_DATABASE_APP_ID, FOOD_DATABASE_APP_KEY } from "@env";
import axios from "axios";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import ProgressBar from "react-native-animated-progress";

const NutritionContent = ({ route, navigation }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log();
    axios
      .get(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=${FOOD_DATABASE_APP_ID}&app_key=${FOOD_DATABASE_APP_KEY}&ingr=${route.params.name}`
      )
      .then((res) => {
        setData(res.data.hints[0].food.nutrients);
        setLoading(false);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <></>
      ) : (
        <>
          <Header />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AnimatedCircularProgress
              size={150}
              width={15}
              fill={Math.round(data.ENERC_KCAL)}
              duration={600}
              tintColor={COLORS.primary}
              lineCap="round"
              style={{ marginTop: 50, marginBottom: 40 }}
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
            <Text
              style={{ ...FONTS.h1, color: COLORS.white, marginBottom: 10 }}
            >
              {route.params.name}
            </Text>
            <View>
              <Text style={{ color: COLORS.black }}>
                Progress with animation and increased height increased
              </Text>
              <Text
                style={{
                  ...FONTS.body2,
                  marginBottom: 10,
                  color: COLORS.white,
                }}
              >
                Fat ({Math.round(data.FAT)}g)
              </Text>
              <ProgressBar
                progress={Math.round(data.FAT) * 3}
                height={7}
                backgroundColor="#ffe066"
              />
            </View>
            <View>
              <Text style={{ color: COLORS.black }}>
                Progress with animation and increased height increased
              </Text>
              <Text
                style={{
                  ...FONTS.body2,
                  marginBottom: 10,
                  color: COLORS.white,
                }}
              >
                Carbohydrates ({Math.round(data.CHOCDF)}g)
              </Text>
              <ProgressBar
                progress={Math.round(data.CHOCDF) * 3}
                height={7}
                backgroundColor={COLORS.primary}
              />
            </View>
            <View>
              <Text style={{ color: COLORS.black }}>
                Progress with animation and increased height increased
              </Text>
              <Text
                style={{
                  ...FONTS.body2,
                  marginBottom: 10,
                  color: COLORS.white,
                }}
              >
                Protein ({Math.round(data.PROCNT)}g)
              </Text>
              <ProgressBar
                progress={Math.round(data.PROCNT) * 3}
                height={7}
                backgroundColor="#b3f0ff"
              />
            </View>
            <View>
              <Text style={{ color: COLORS.black }}>
                Progress with animation and increased height increased
              </Text>
              <Text
                style={{
                  ...FONTS.body2,
                  marginBottom: 10,
                  color: COLORS.white,
                }}
              >
                Fiber ({Math.round(data.FIBTG)}g)
              </Text>
              <ProgressBar
                progress={Math.round(data.FIBTG) * 3}
                height={7}
                backgroundColor="#e6ccff"
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginRight: 80,
              marginLeft: 80,
              marginTop: 50,
              paddingTop: 20,
              paddingBottom: 20,
              backgroundColor: COLORS.black,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: COLORS.primary,
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Text
              style={{
                ...FONTS.body2,
                color: COLORS.white,
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              GO BACK
            </Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default NutritionContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});
