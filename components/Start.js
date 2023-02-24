import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  Pressable,
  TouchableNativeFeedback,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Start = (props) => {
  // Save name and color
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  return (
    <View style={styles.container}>
      {/* Set background */}
      <ImageBackground
        source={require("./img/background.png")}
        style={styles.background}
      >
        <Text style={styles.text}>myChat</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputName}>
            <Ionicons
              style={{ position: "absolute", top: "40%", marginLeft: 8 }}
              name="person-outline"
              size={24}
              color="#757083"
            />
            <TextInput
              style={{ marginLeft: 30 }}
              placeholder="Your Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            />
          </View>
          <View style={{ marginTop: -60 }}>
            <Text style={styles.colorText}>Choose Background Color:</Text>
            {/* Set color depending on the area pressed */}
            <View style={styles.colorBoxContainer}>
              <TouchableNativeFeedback
                onPress={() => {
                  setColor(styles.color1.backgroundColor);
                }}
              >
                <View style={styles.color1} />
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  setColor(styles.color2.backgroundColor);
                }}
              >
                <View style={styles.color2} />
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  setColor(styles.color3.backgroundColor);
                }}
              >
                <View style={styles.color3} />
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  setColor(styles.color4.backgroundColor);
                }}
              >
                <View style={styles.color4} />
              </TouchableNativeFeedback>
            </View>
          </View>
          {/* Navigate to chat screen upon pressing */}
          <Pressable
            style={styles.buttonChat}
            onPress={() => {
              props.navigation.setOptions({ title: `${name}` });
              props.navigation.navigate("Chat", {
                name,
                color,
              });
            }}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 45,
    color: "#ffffff",
    fontWeight: "600",
    marginTop: 120,
  },
  background: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    width: 400,
    height: 350,
    backgroundColor: "#ffffff",
    opacity: 0.9,
    justifyContent: "space-between",
  },
  inputName: {
    position: "relative",
    fontSize: 16,
    opacity: 0.8,
    fontWeight: "300",
    color: "#757083",
    borderWidth: 2,
    borderColor: "#757083",
    margin: 20,
    padding: 10,
  },
  colorText: {
    fontSize: 16,
    fontWeight: "300",
    opacity: 1,
    color: "#757083",
    marginLeft: 20,
  },
  colorBoxContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 10,
  },
  color1: {
    backgroundColor: "#090C08",
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    marginRight: 10,
  },
  color2: {
    backgroundColor: "#474056",
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    marginRight: 10,
  },
  color3: {
    backgroundColor: "#8A95A5",
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    marginRight: 10,
  },
  color4: {
    backgroundColor: "#B9C6AE",
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  buttonChat: {
    backgroundColor: "#757083",
    margin: 20,
    padding: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
});

export default Start;