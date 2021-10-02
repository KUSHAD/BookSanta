import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import { firebaseAuth, firebaseFirestore } from "../config";
export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      id: "",
    };
  }
  componentDidMount() {
    firebaseFirestore
      .collection("users")
      .where("email", "==", firebaseAuth.currentUser.email)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((document) => {
          this.setState({
            firstName: document.data().firstName,
            lastName: document.data().lastName,
            address: document.data().address,
            contact: document.data().contact,
            id: document.id,
          });
        });
      });
  }
  updateUser = () => {
    const { firstName, lastName, address, contact } = this.state;
    firebaseFirestore
      .collection("users")
      .doc(this.state.id)
      .update({ firstName, lastName, address, contact });
  };
  render() {
    return (
      <>
        <CustomHeader {...this.props} />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Text>First Name</Text>
          <TextInput
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              borderWidth: 2,
              borderColor: "#000",
            }}
            value={this.state.firstName}
            onChangeText={(text) =>
              this.setState({
                firstName: text,
              })
            }
          />
          <Text>Last Name</Text>
          <TextInput
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              borderWidth: 2,
              borderColor: "#000",
            }}
            value={this.state.lastName}
            onChangeText={(text) =>
              this.setState({
                lastName: text,
              })
            }
          />
          <Text>Address</Text>
          <TextInput
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              borderWidth: 2,
              borderColor: "#000",
            }}
            value={this.state.address}
            onChangeText={(text) =>
              this.setState({
                address: text,
              })
            }
          />
          <Text>Contact Number</Text>
          <TextInput
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              borderWidth: 2,
              borderColor: "#000",
            }}
            value={this.state.contact}
            onChangeText={(text) =>
              this.setState({
                contact: text,
              })
            }
          />
          <Button onPress={this.updateUser} title="Update" />
        </View>
      </>
    );
  }
}
