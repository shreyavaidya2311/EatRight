import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { icons, COLORS, FONTS, images } from "../constants";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import "../config";
import axios from "axios";

const Friends = () => {
  const user = useAuth();
  const [data, setData] = useState([]);
  const [headers, _] = useState(["Rank", "Name", "Points"]);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    axios.get(`${global.config.host}/api/awards/get-ranks`).then((res) => {
      let tempArr = [];
      let user_points = 0;
      res.data.ranks.forEach((elem, index) => {
        tempArr.push([index + 1, elem.name, elem.points]);
        if (elem.email === user.email) user_points = elem.points;
      });
      setData(tempArr);
      setUserPoints(user_points);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
              width: 100,
              height: 100,
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
              fontSize: 40,
            }}
          >
            {userPoints}
          </Text>
        </View>
      </View>

      <View style={styles.table_container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#fff" }}>
          <Row data={headers} style={styles.head} textStyle={styles.text} />
          <Rows data={data} textStyle={styles.text} />
        </Table>
      </View>
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
