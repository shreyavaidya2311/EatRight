import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
export default function CameraScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isFlashON, setIsFlashON] = useState(Camera.Constants.FlashMode.off);
  const [source, setSource] = useState("");
  const cam = useRef();
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
      })
      .catch((err) => {
        console.log(err.response.data);
        Alert.alert("Error", err.response.data);
      });
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
    </View>
  );
}

const styles = StyleSheet.create({
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
});
