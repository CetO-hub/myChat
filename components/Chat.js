import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;
  return (
    // Use passed color as background color
    <View style={[styles.container, { backgroundColor: `${color}` }]}>
      <View></View>
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
});

export default Chat;
