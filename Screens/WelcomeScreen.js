import React, { Component } from "react";
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { firebaseAuth, firebaseFirestore } from "../config";
export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      confirmPassword: "",
      isModalVisible: false,
    };
  }

  signup = async (email, password) => {
    if (password !== this.state.confirmPassword) {
      return Platform.OS === "web"
        ? alert("Passwords dont match")
        : Alert.alert("Error", "Passwords dont match");
    }
    await firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebaseFirestore
          .collection("users")
          .doc(firebaseAuth.currentUser.uid)
          .set({
            email,
            password,
            avatar: `https://avatars.dicebear.com/api/jdenticon/${firebaseAuth.currentUser.uid}.svg`,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            contact: this.state.contact,
            isBookRequestActive: false,
          })
          .then(() => {
            Platform.OS === "web"
              ? alert("You Have Been Succesfully Registered")
              : Alert.alert("Success", "You Have Been Succesfully Registered");
          })
          .catch((error) => {
            Platform.OS === "web"
              ? alert(error.message)
              : Alert.alert("Error", error.message);
          });
      })
      .catch((error) => {
        Platform.OS === "web"
          ? alert(error.message)
          : Alert.alert("Error", error.message);
      });
  };

  login = async (email, password) => {
    await firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Platform.OS === "web"
          ? alert("You Have Been Succesfully Login")
          : Alert.alert("Success", "You Have Been Succesfully Login");
        this.props.navigation.navigate("Drawer");
      })
      .catch((error) => {
        Platform.OS === "web"
          ? alert(error.message)
          : Alert.alert("Error", error.message);
      });
  };

  showModal = () => {
    return (
      <Modal
        presentationStyle="formSheet"
        animationType="slide"
        collapsable
        visible={this.state.isModalVisible}
      >
        <KeyboardAvoidingView style={styles.innerContainer}>
          <TextInput
            style={styles.input}
            value={this.state.firstName}
            onChangeText={(text) => this.setState({ firstName: text })}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            value={this.state.lastName}
            onChangeText={(text) => this.setState({ lastName: text })}
            placeholder="Last Name"
          />
          <TextInput
            style={styles.input}
            value={this.state.contact}
            onChangeText={(text) => this.setState({ contact: text })}
            placeholder="Phone Number"
          />
          <TextInput
            multiline
            style={styles.input}
            value={this.state.address}
            onChangeText={(text) => this.setState({ address: text })}
            placeholder="Address"
          />
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={this.state.password}
            secureTextEntry
            onChangeText={(text) => this.setState({ password: text })}
            placeholder="Password"
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            value={this.state.confirmPassword}
            placeholder="Confirm Password"
            onChangeText={(text) => this.setState({ confirmPassword: text })}
          />
        </KeyboardAvoidingView>
        <Button
          title="Signup"
          onPress={() => this.signup(this.state.email, this.state.password)}
        />
        <SafeAreaView
          style={{
            marginBottom: 10,
          }}
        />
        <Button
          title="Cancel"
          onPress={() =>
            this.setState({
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              address: "",
              contact: "",
              confirmPassword: "",
              isModalVisible: false,
            })
          }
        />
      </Modal>
    );
  };

  render() {
    return (
      <>
        {this.state.isModalVisible ? (
          this.showModal()
        ) : (
          <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.innerContainer}>
              <Image
                source={require("../assets/books.jpg")}
                style={{
                  width: 50,
                  height: 60,
                  alignSelf: "center",
                }}
              />
              <Text style={styles.title}>Book Santa</Text>
              <Text style={styles.subtitle}>
                Please Login Or Signup To Continue
              </Text>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={this.state.email}
                style={styles.input}
                keyboardType="email-address"
                keyboardAppearance="default"
                paddingLeft={12}
                paddingRight={12}
                onChangeText={(text) =>
                  this.setState({
                    email: text,
                  })
                }
              />
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={this.state.password}
                style={styles.input}
                secureTextEntry
                paddingLeft={12}
                paddingRight={12}
                onChangeText={(text) =>
                  this.setState({
                    password: text,
                  })
                }
              />
              <Button
                title="Login"
                onPress={() =>
                  this.login(this.state.email, this.state.password)
                }
              />
              <SafeAreaView
                style={{
                  marginBottom: 10,
                }}
              />
              <Button
                title="Signup"
                onPress={() => {
                  this.setState({
                    isModalVisible: true,
                  });
                }}
              />
            </SafeAreaView>
          </SafeAreaView>
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
  innerContainer: {
    width: "80%",
  },
  title: {
    fontSize: 32,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "grey",
    textDecorationLine: "underline",
  },
  label: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
  },
});
