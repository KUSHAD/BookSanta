import React, { Component } from "react";
import { Text, View, FlatList, Image } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import { firebaseAuth, firebaseFirestore } from "../config";

export default class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
    };
  }

  componentDidMount() {
    firebaseFirestore
      .collection("all-notifications")
      .where("status", "==", "unread")
      .where("targetUserId", "==", firebaseAuth.currentUser.email)
      .get()
      .then((snap) => {
        const docs = snap.docs.map((doc) => doc.data());
        this.setState({
          notifications: docs,
        });
      });
  }
  render() {
    return (
      <>
        <CustomHeader {...this.props} />
        <Image
          source={require("../assets/books.jpg")}
          style={{
            alignSelf: "center",
            marginTop: 60,
          }}
          width={64}
          height={50}
        />
        <FlatList
          renderItem={({ item }) => (
            <View
              style={{
                marginTop: 50,
                borderBottomWidth: 5,
                padding: 10,
                flexDirection: "row",
              }}
            >
              <Image
                source={require("../assets/request-book.png")}
                style={{
                  alignSelf: "center",
                  marginTop: 60,
                  height: 20,
                  width: 20,
                }}
              />
              <Text
                style={{ textTransform: "uppercase" }}
                textBreakStrategy="simple"
              >
                {item.message}
              </Text>
            </View>
          )}
          data={this.state.notifications}
        />
      </>
    );
  }
}
