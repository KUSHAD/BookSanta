import React, { Component } from "react";
import { FlatList } from "react-native";
import { Text, View } from "react-native";
import { firebaseAuth, firebaseFirestore } from "../config";

export default class MyReceivedBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedBooks: [],
    };
  }

  componentDidMount() {
    this.getReceivedBooks();
  }
  getReceivedBooks = async () => {
    const { docs } = await firebaseFirestore
      .collection("all-donations")
      .where("userId", "==", firebaseAuth.currentUser.email)
      .where("requestStatus", "==", "Done")
      .get();
    const books = docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    this.setState({
      receivedBooks: books,
    });
  };
  render() {
    return (
      <FlatList
        data={this.state.receivedBooks}
        renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text>}
        keyExtractor={(item) => item.id}
      />
    );
  }
}
