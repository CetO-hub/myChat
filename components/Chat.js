import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {},
    };
    const firebaseConfig = {
      apiKey: "AIzaSyAK14AAznVyLEUVOgZiOJPEzNPBCtt9MVs",
      authDomain: "mychat-df51e.firebaseapp.com",
      projectId: "mychat-df51e",
      storageBucket: "mychat-df51e.appspot.com",
      messagingSenderId: "279067549561",
      appId: "1:279067549561:web:3928612facff87d3e6d9a8",
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // set firestore reference messages
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      this.setState({
        messages: [],
        user: {
          _id: user.uid,
          name,
        },
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  // unsuscribe
  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  // change when different from snapshot
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({ messages });
  };

  // add message to firestore
  addMessage = (message) => {
    this.referenceChatMessages.add({
      _id: message[0]._id,
      createdAt: message[0].createdAt,
      text: message[0].text || "",
      user: {
        _id: this.state.user._id,
        name: this.props.route.params.name,
      },
      image: message[0].image || null,
      location: message[0].location || null,
    });
  };

  // send message => append to messages array
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage(messages);
      }
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "black",
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: "#e3e3e3",
          },
          right: {
            backgroundColor: "#fff",
          },
        }}
      />
    );
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.route.params.color },
        ]}
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
          }}
        />
        {Platform.OS === "android" && (
          <KeyboardAvoidingView behavior="height" />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
