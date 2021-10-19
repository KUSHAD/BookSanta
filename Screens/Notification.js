import React, { Component } from "react";
import { Text, View, FlatList, Image, Alert } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import SwipeableFlatlist from "../Components/SwipeableFlatlist";
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
        const docs = snap.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        this.setState({
          notifications: docs,
        });
      });
  }
  render() {
    return (
      <>
        <CustomHeader {...this.props} />
        <SwipeableFlatlist allNotifs={this.state.notifications} />
      </>
    );
  }
}
