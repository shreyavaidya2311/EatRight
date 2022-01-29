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
} from "react-native";
import { COLORS } from "../constants";
import { Camera } from "expo-camera";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { RadioButton, ScrollView } from "react-native-paper";
export default function CameraScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isFlashON, setIsFlashON] = useState(Camera.Constants.FlashMode.off);
  const [source, setSource] = useState("");
  const [imgData, setImgData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [foodName, setFoodName] = React.useState();
  const cam = useRef();
  const isFocused = useIsFocused();
  const _takePicture = async () => {
    const option = {
      quality: 0.8,
      base64: true,
      skipProcessing: false,
    };
    if (cam.current) {
      const photo = await cam.current.takePictureAsync(option);
      // console.log(Object.keys(photo));
      // console.log(photo.uri, source);
      if (photo.base64) {
        setSource(photo);
      }
    }
  };
  const handleSave = (source) => {
    // console.log("camera", source);
    setModalVisible(true);
    // axios
    //   .post(`${global.config.host}/api/upload`, {
    //     file: `data:image/jpg;base64,${source.base64}`,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     // Object {
    //     //   "public_id": "EatRight/y3sphhmjxhhof0wokacj",
    //     //   "url": "https://res.cloudinary.com/kartik134/image/upload/v1643450108/EatRight/y3sphhmjxhhof0wokacj.jpg",
    //     // }
    //     // Alert.alert("EatRight", "Image Uploaded");
    //     setSource(null);
    //     setImgData(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data);
    //     Alert.alert("Error", err.response.data);
    //   });
    setImgData([
      { id: "ai_skxkRfDl", name: "cake", value: 0.8173249, app_id: "main" },
      {
        id: "ai_FnZCSVMH",
        name: "cheese",
        value: 0.05843158,
        app_id: "main",
      },
      {
        id: "ai_b4b4hLRV",
        name: "turkey",
        value: 0.030007755,
        app_id: "main",
      },
      {
        id: "ai_w68d36Ks",
        name: "bread",
        value: 0.026850646,
        app_id: "main",
      },
      {
        id: "ai_jmcSl8c1",
        name: "bacon",
        value: 0.025388198,
        app_id: "main",
      },
      {
        id: "ai_MsJXFg9r",
        name: "birthday cake",
        value: 0.021305881,
        app_id: "main",
      },
      {
        id: "ai_ZHtk2LRK",
        name: "potato",
        value: 0.011976058,
        app_id: "main",
      },
      {
        id: "ai_KWmFf1fn",
        name: "meat",
        value: 0.010327755,
        app_id: "main",
      },
      {
        id: "ai_rrs6pHmR",
        name: "hash",
        value: 0.008335112,
        app_id: "main",
      },
      {
        id: "ai_wh3P1BKX",
        name: "carrot cake",
        value: 0.007329989,
        app_id: "main",
      },
      {
        id: "ai_s7nSB81X",
        name: "tacos",
        value: 0.00480614,
        app_id: "main",
      },
      {
        id: "ai_ndkzmqnK",
        name: "cereal",
        value: 0.004639528,
        app_id: "main",
      },
      {
        id: "ai_mPjqBnPk",
        name: "carrot",
        value: 0.0043322365,
        app_id: "main",
      },
      {
        id: "ai_7dcVtHqc",
        name: "lamb",
        value: 0.003883064,
        app_id: "main",
      },
      {
        id: "ai_7bPDsM3z",
        name: "brisket",
        value: 0.0035047615,
        app_id: "main",
      },
      {
        id: "ai_p5Hb83Hf",
        name: "cottage cheese",
        value: 0.0033310852,
        app_id: "main",
      },
      {
        id: "ai_pFX4Wrwz",
        name: "kale",
        value: 0.0032779747,
        app_id: "main",
      },
      {
        id: "ai_BQb2KDKr",
        name: "yogurt",
        value: 0.003241079,
        app_id: "main",
      },
      {
        id: "ai_LGL1LmZD",
        name: "whipped cream",
        value: 0.0032398237,
        app_id: "main",
      },
      {
        id: "ai_bkKjGgB0",
        name: "oatmeal",
        value: 0.002980678,
        app_id: "main",
      },
    ]);
  };
  // useEffect(async () => {
  //   //  const res=await axios.get("")
  //   const url =
  //     "https://res.cloudinary.com/kartik134/image/upload/v1643450108/EatRight/wkxdut9qvv1owd2d3oub.jpg";
  // }, [imgData]);
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
              height: "50%",
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
              <View
                style={{
                  borderColor: "#333",
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    color: "#eee",
                    fontSize: 20,
                    paddingHorizontal: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Confirm Your Food Item
                </Text>
                <RadioButton.Group
                  onValueChange={(newValue) => setFoodName(newValue)}
                  value={foodName}
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <FlatList
                    horizontal
                    data={imgData}
                    renderItem={({ item }) => {
                      return (
                        <View style={styles.foodItem}>
                          <Text>{item.name}</Text>
                          <RadioButton value={item.name} />
                        </View>
                      );
                    }}
                    keyExtractor={(item) => item.id}
                  />
                </RadioButton.Group>
              </View>
              <View>
                <Button
                  mode="contained"
                  style={{ width: "30%" }}
                  onPress={() => console.log("Pressed")}
                >
                  Done
                </Button>
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
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.primary,
    color: "#fff",
    alignItems: "center",
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
    backgroundColor: COLORS.secondary,
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
