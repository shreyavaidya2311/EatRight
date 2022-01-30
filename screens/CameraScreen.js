import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { COLORS, FONTS } from "../constants";
import { Camera } from "expo-camera";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  ActivityIndicator,
  Colors,
  TextInput,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { FOOD_DATABASE_APP_ID, FOOD_DATABASE_APP_KEY } from "@env";
import useAuth from "../hooks/useAuth";

export default function CameraScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isFlashON, setIsFlashON] = useState(Camera.Constants.FlashMode.off);
  const [source, setSource] = useState("");
  const [imgData, setImgData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [foodName, setFoodName] = useState();
  const [url, setURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [cals, setCals] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [prots, setProts] = useState(0);
  const [fibers, setFibers] = useState(0);
  const [fats, setFats] = useState(0);
  const [food_type, setFoodType] = useState("breakfast");
  const cam = useRef();
  const isFocused = useIsFocused();
  const user = useAuth();

  const _takePicture = async () => {
    const option = {
      quality: 0.8,
      base64: true,
      skipProcessing: true,
    };
    if (cam.current) {
      const photo = await cam.current.takePictureAsync(option);
      if (photo.base64) {
        setImgData([]);
        setFoodName(null);
        setSource(photo);
        setClicked(false);
        setModalVisible(false);
        setLoading(true);
        setCals(0);
        setCarbs(0);
        setProts(0);
        setFibers(0);
        setFats(0);
      }
    }
  };

  const handleSave = (source) => {
    setModalVisible(true);
    axios
      .post(`${global.config.host}/api/upload`, {
        file: `data:image/jpg;base64,${source.base64}`,
        email: user.user.email,
      })
      .then((res) => {
        setImgData(res.data.data);
        setURL(res.data.url);
      })
      .catch((err) => {
        console.log(err.response.data);
        Alert.alert("Error", err.response.data);
      });
  };

  const handleDoneClick = () => {
    axios
      .get(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=${FOOD_DATABASE_APP_ID}&app_key=${FOOD_DATABASE_APP_KEY}&ingr=${foodName}`
      )
      .then((res) => {
        console.log(res.data.hints[0].food.nutrients);
        setCals("" + res.data.hints[0].food.nutrients["ENERC_KCAL"]);
        setCarbs("" + res.data.hints[0].food.nutrients["CHOCDF"]);
        setProts("" + res.data.hints[0].food.nutrients["PROCNT"]);
        setFibers("" + res.data.hints[0].food.nutrients["FIBTG"]);
        setFats("" + res.data.hints[0].food.nutrients["FAT"]);
        setClicked(true);
      });
  };

  const handleFinish = () => {
    axios
      .post(`${global.config.host}/api/food/add-food`, {
        name: foodName,
        cals,
        carbs,
        prots,
        fats,
        fibers,
        url,
        food_type,
        email: user.user.email,
      })
      .then((res) => {
        console.log(res.data);
        setModalVisible(false);
      })
      .catch((err) => console.log(err));
    setSource(null);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    isFocused && (
      <View style={styles.container}>
        {source ? (
          <View style={styles.camera}>
            <Image
              flex={1}
              source={{
                uri: `data:image/jpg;base64,${source.base64}`,
              }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.FlipButton}
                onPress={() => {
                  setSource(null);
                }}
              >
                <MaterialIcons name="cancel" size={50} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CaptureButton}
                onPress={() => {
                  handleSave(source);
                }}
              >
                <MaterialIcons name="done" size={50} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Camera
            ref={cam}
            style={styles.camera}
            autoFocus="on"
            flashMode={isFlashON}
            type={type}
            useCamera2Api={true}
            skipProcessing={true}
            zoom={0}
            ratio={"16:9"}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.FlipButton}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <MaterialIcons name="flip-camera-ios" size={50} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CaptureButton}
                onPress={() => {
                  _takePicture();
                }}
              >
                <Entypo name="circle" size={50} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.CaptureButton}
                onPress={() => {
                  setIsFlashON(
                    isFlashON === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  );
                }}
              >
                {isFlashON ? (
                  <Ionicons name="flash-sharp" size={50} color="white" />
                ) : (
                  <Ionicons name="ios-flash-off" size={50} color="white" />
                )}
              </TouchableOpacity>
            </View>
          </Camera>
        )}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View
            style={{
              height: "80%",
              marginTop: "auto",
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalTopContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <MaterialIcons
                    name="cancel"
                    style={{ padding: 10 }}
                    size={30}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    ...FONTS.h2,
                    color: "#eee",
                    fontSize: 20,
                    paddingHorizontal: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Confirm Your Food Item
                </Text>
                {clicked ? (
                  <View style={{ marginTop: 10 }}>
                    <SafeAreaView>
                      <ScrollView>
                        <TextInput
                          label="Item Name"
                          value={foodName}
                          onChangeText={(text) => setFoodName(text)}
                          style={{
                            marginTop: 10,
                            borderColor: COLORS.primary,
                            borderWidth: 3,
                            height: 55,
                          }}
                        />
                        <TextInput
                          label="Calories"
                          value={cals}
                          onChangeText={(text) => setCals(text)}
                          style={{
                            marginTop: 10,
                            borderColor: COLORS.primary,
                            borderWidth: 3,
                            height: 55,
                          }}
                        />
                        <TextInput
                          label="Carbohydrates"
                          value={carbs}
                          onChangeText={(text) => setCarbs(text)}
                          style={{
                            marginTop: 10,
                            borderColor: COLORS.primary,
                            borderWidth: 3,
                            height: 55,
                          }}
                        />
                        <TextInput
                          label="Proteins"
                          value={prots}
                          onChangeText={(text) => setProts(text)}
                          style={{
                            marginTop: 10,
                            borderColor: COLORS.primary,
                            borderWidth: 3,
                            height: 55,
                          }}
                        />
                        <TextInput
                          label="Fats"
                          value={fats}
                          onChangeText={(text) => setFats(text)}
                          style={{
                            marginTop: 10,
                            borderColor: COLORS.primary,
                            borderWidth: 3,
                            height: 55,
                          }}
                        />
                        <TextInput
                          label="Fibers"
                          value={fibers}
                          onChangeText={(text) => setFibers(text)}
                          style={{
                            marginTop: 10,
                            borderColor: COLORS.primary,
                            borderWidth: 3,
                            height: 55,
                          }}
                        />
                        <TextInput
                          label="Food Type"
                          value={food_type}
                          onChangeText={(text) => setFoodType(text)}
                          style={{
                            marginTop: 10,
                            borderColor: COLORS.primary,
                            borderWidth: 3,
                            height: 55,
                          }}
                        />
                        {/* <Picker
                          selectedValue={food_type}
                          style={{ height: 50, width: 150 }}
                          onValueChange={(itemValue, itemIndex) =>
                            setFoodType(itemValue)
                          }
                        >
                          <Picker.Item label="Breakfast" value="breakfast" />
                          <Picker.Item label="Lunch" value="lunch" />
                          <Picker.Item label="Snacks" value="snacks" />
                          <Picker.Item label="Dinner" value="dinner" />
                        </Picker> */}
                        <View
                          style={{
                            alignItems: "center",
                            marginTop: 15,
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              padding: 10,
                              width: 100,
                              backgroundColor: COLORS.black,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: COLORS.primary,
                            }}
                            onPress={handleFinish}
                          >
                            <Text
                              style={{
                                ...FONTS.body2,
                                color: COLORS.white,
                                justifyContent: "center",
                                textAlign: "center",
                              }}
                            >
                              DONE
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </ScrollView>
                    </SafeAreaView>
                  </View>
                ) : (
                  <>
                    {imgData ? (
                      <>
                        <FlatList
                          horizontal
                          data={imgData}
                          renderItem={({ item }) => {
                            return (
                              <View style={styles.foodItem}>
                                <Button
                                  value={item.name}
                                  onPress={() => setFoodName(item.name)}
                                  color="#000"
                                  mode="outlined"
                                  icon={item.name === foodName && "check"}
                                >
                                  {item.name.toUpperCase()}
                                </Button>
                              </View>
                            );
                          }}
                          keyExtractor={(item) => item.id}
                        />
                        <View
                          style={{
                            alignItems: "center",
                            marginTop: 30,
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              marginTop: 50,
                              padding: 20,
                              backgroundColor: COLORS.black,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: COLORS.primary,
                            }}
                            onPress={handleDoneClick}
                          >
                            <Text
                              style={{
                                ...FONTS.body2,
                                color: COLORS.white,
                                justifyContent: "center",
                                textAlign: "center",
                              }}
                            >
                              PROCEED
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <ActivityIndicator
                        animating={true}
                        color={Colors.red800}
                      />
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  modalTopContainer: {
    alignContent: "flex-end",
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
  },
  foodItem: {
    margin: 10,
    borderRadius: 7,
    borderColor: COLORS.primary,
  },
  camera: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    minWidth: "100%",
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },

  text: {
    fontSize: 18,
    color: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "black",
    fontSize: 18,
    padding: 26,
  },
  noteHeader: {
    backgroundColor: "#42f5aa",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    // backgroundColor: "white",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  textInput: {
    alignSelf: "stretch",
    color: "black",
    padding: 20,
    backgroundColor: "#ddd",
    borderTopWidth: 2,
    borderTopColor: "#ddd",
  },
  addButton: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: "#98B3B7",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
