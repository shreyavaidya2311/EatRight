import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { icons, COLORS, FONTS, images } from "../constants";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import "../config";
import axios from "axios";
import Header from "../components/Header";
import ProgressBar from "react-native-animated-progress";

const renderItem = ({ item }) => {
  return (
    <View style={{ marginRight: 20, marginLeft: 20 }}>
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
        <Text
          style={{
            color: "#f3be77",
          }}
        >
          #{item[0]}
        </Text>
        {"  "}
        {item[1]}
      </Text>
      <ProgressBar
        progress={Math.round(item[2])}
        height={7}
        backgroundColor="#ffe066"
      />
    </View>
  );
};

const Friends = () => {
  const user = useAuth();
  const [data, setData] = useState([]);
  const [headers, _] = useState(["Rank", "Name", "Points"]);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      axios.get(`${global.config.host}/api/awards/get-ranks`).then((res) => {
        let tempArr = [];
        let user_points = 0;
        res.data.ranks.forEach((elem, index) => {
          tempArr.push([index + 1, elem.name, elem.points]);
          if (elem.email === user.user.email) user_points = elem.points;
        });
        setData(tempArr);
        setUserPoints(user_points);
        setLoading(false);
      });
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {!loading && (
        <>
          <Header />
          <View
            style={{
              flexDirection: "row",
              height: 50,
              marginTop: 85,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={images.award}
                style={{
                  width: 80,
                  height: 80,
                  resizeMode: "contain",
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              height: 50,
              marginTop: 40,
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
              <Text
                style={{
                  color: COLORS.primary,
                  ...FONTS.h1,
                }}
              >
                {userPoints} Points
              </Text>
            </View>
          </View>

          <View style={styles.table_container}>
            <FlatList
              data={data}
              keyExtractor={(item) => `${item[0]}`}
              renderItem={renderItem}
            />
          </View>
        </>
      )}
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
  table_container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: COLORS.black,
    height: 20,
  },
  head: { height: 40 },
  text: { margin: 6, color: COLORS.primary },
});

export default Friends;
