import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from "react-native";
import { Camera } from "expo-camera";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
export default function CameraScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isFlashON, setIsFlashON] = useState(Camera.Constants.FlashMode.off);
  const [source, setSource] = useState("");
  const [imgData, setImgData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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
    axios
      .post("http://192.168.1.8:5000/api/upload", {
        file: `data:image/jpg;base64,${source.base64}`,
      })
      .then((res) => {
        console.log(res.data);
        // Object {
        //   "public_id": "EatRight/y3sphhmjxhhof0wokacj",
        //   "url": "https://res.cloudinary.com/kartik134/image/upload/v1643450108/EatRight/y3sphhmjxhhof0wokacj.jpg",
        // }
        // Alert.alert("EatRight", "Image Uploaded");
        setSource(null);
        setImgData(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        Alert.alert("Error", err.response.data);
      });
  };
  useEffect(async () => {
    //  const res=await axios.get("")
    const url =
      "https://res.cloudinary.com/kartik134/image/upload/v1643450108/EatRight/wkxdut9qvv1owd2d3oub.jpg";
  }, [imgData]);
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
              <Text style={styles.headerText}>This is Half Modal</Text>
            </View>
          </View>
        </Modal>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  modalTopContainer: {
    flex: 0.15,
    alignContent: "flex-end",
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
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
    backgroundColor: "white",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
