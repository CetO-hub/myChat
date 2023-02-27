import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          id: 2,
          name: "React Native",
          avatar: "http://placekitten.com/140/140",
        },
      },
      {
        _id: 2,
        text: `${name} has entered the chat room`,
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessage) =>
      GiftedChat.append(previousMessage, messages)
    );
  }, []);

  return (
    // Use passed color as background color
    <View style={[styles.container, { backgroundColor: `${color}` }]}>
      <GiftedChat messages={messages} onSend={(messages) => onSend(messages)} />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});

export default Chat;
