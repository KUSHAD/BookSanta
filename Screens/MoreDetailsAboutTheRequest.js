import firebase from "firebase";
import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import { firebaseFirestore, firebaseAuth } from "../config";
class MoreDetailsAboutTheRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routerParams: this.props.navigation.getParam("details"),
    };
  }
  acceptDonation = async () => {
    await firebaseFirestore.collection("all-donations").add({
      bookName: this.state.routerParams.bookName,
      requestId: this.state.routerParams.uid,
      userId: this.state.routerParams.email,
      requestStatus: "Donor Interested",
      acceptedUserId: firebaseAuth.currentUser.email,
    });
    this.sendNotifications();
  };
  sendNotifications = async () => {
    const message = `${firebaseAuth.currentUser.email} has shown interest to your request for book ${this.state.routerParams.bookName}`;
    await firebaseFirestore.collection("all-notifications").add({
      message: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: "unread",
      targetUserId: this.state.routerParams.email,
    });
  };
  render() {
    return (
      <>
        <CustomHeader {...this.props} />
        <View
          style={{
            padding: 10,
          }}
        >
          <Text>Book Name :- {this.state.routerParams.bookName}</Text>
          <Text>Email :- {this.state.routerParams.email}</Text>
          <Text>Reason :- {this.state.routerParams.reason}</Text>
          {firebaseAuth.currentUser.email !== this.state.routerParams.email && (
            <Button title="I am interested" onPress={this.acceptDonation} />
          )}
        </View>
      </>
    );
  }
}
export default MoreDetailsAboutTheRequest;
