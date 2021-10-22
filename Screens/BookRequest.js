import React from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import { firebaseAuth, firebaseFirestore, time } from "../config";
export default class BookRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookName: "",
      reason: "",
      isBookRequestActive: false,
      bookRequestActiveDetails: {},
      isLoading: false,
    };
  }
  uuid = () => {
    return Math.random().toString(36).substring(7);
  };
  handleSubmit = async () => {
    this.setState({
      isLoading: true,
    });
    await firebaseFirestore
      .collection("users")
      .doc(firebaseAuth.currentUser.uid)
      .update({
        isBookRequestActive: true,
      });
    const { bookName, reason } = this.state;
    const uid = this.uuid();
    await firebaseFirestore.collection("requests").add({
      bookName,
      reason,
      uid,
      email: firebaseAuth.currentUser.email,
    });
    await this.getUserReqStats();

    this.setState({
      isLoading: false,
    });
  };

  getUserReqStats = async () => {
    const { docs } = await firebaseFirestore
      .collection("users")
      .where("email", "==", firebaseAuth.currentUser.email)
      .where("isBookRequestActive", "==", true)
      .get();

    const { docs: bookDocs } = await firebaseFirestore
      .collection("all-donations")
      .where("userId", "==", firebaseAuth.currentUser.email)
      .where("requestStatus", "==", "Donor Interested")
      .get();

    if (docs.length !== 0 && bookDocs.length !== 0)
      return this.setState({
        isBookRequestActive: true,
        bookRequestActiveDetails: {
          ...bookDocs[0].data(),
          id: bookDocs[0].id,
        },
      });

    this.setState({
      isBookRequestActive: false,
    });
  };

  componentDidMount() {
    this.getUserReqStats();
  }

  markAsDone = async () => {
    this.setState({
      isLoading: true,
    });
    await firebaseFirestore
      .collection("users")
      .doc(firebaseAuth.currentUser.uid)
      .update({
        isBookRequestActive: false,
      });
    await firebaseFirestore
      .collection("all-donations")
      .doc(this.state.bookRequestActiveDetails.id)
      .update({
        requestStatus: "Done",
      });
    await firebaseFirestore.collection("all-notifications").add({
      message: "The requestor has received the book!!",
      status: "unread",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      targetUserId: this.state.bookRequestActiveDetails.acceptedUserId,
    });
    this.setState({
      isBookRequestActive: false,
      isLoading: false,
    });
  };

  render() {
    return (
      <>
        <CustomHeader {...this.props} />
        {this.state.isBookRequestActive ? (
          <View style={styles.container}>
            <View
              style={{
                width: "80%",
              }}
            >
              <Text>You have An OnGoing Requests</Text>
              <Text>{this.state.bookRequestActiveDetails.bookName}</Text>
              <Text>{this.state.bookRequestActiveDetails.requestStatus}</Text>

              <Button
                disabled={this.state.isLoading}
                onPress={this.markAsDone}
                title="I have Received The Book"
              />
            </View>
          </View>
        ) : (
          <>
            <View style={styles.container}>
              <View
                style={{
                  width: "80%",
                }}
              >
                <TextInput
                  placeholder="Bookname"
                  onChangeText={(text) => {
                    this.setState({
                      bookName: text,
                    });
                  }}
                  value={this.state.bookName}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Reason For Book Request"
                  onChangeText={(text) => {
                    this.setState({
                      reason: text,
                    });
                  }}
                  value={this.state.reason}
                  style={styles.input}
                />
                <Button
                  title="Submit Request"
                  onPress={this.handleSubmit}
                  disabled={this.state.isLoading}
                />
              </View>
            </View>
          </>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
  },
});
