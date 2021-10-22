import React, { Component } from "react";
import { DrawerItems } from "react-navigation-drawer";
import { Avatar } from "react-native-elements";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { firebaseAuth, firebaseFirestore, firebaseStorage } from "../config";
import * as ImagePicker from "expo-image-picker";
export default class CustomSideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: "",
      name: "",
    };
  }

  componentDidMount() {
    this.getAvatar();
  }
  getAvatar = () => {
    firebaseFirestore
      .collection("users")
      .doc(firebaseAuth.currentUser.uid)
      .onSnapshot(async (snap) => {
        await this.setState({
          name: snap.data().firstName + " " + snap.data().lastName,
        });
      });
  };
  askForUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        this.setState({ avatar: result.uri });
        const childPath = `post/${
          firebaseAuth.currentUser.uid
        }/${Math.random().toString(36)}`;
        const task = firebaseStorage.ref().child(childPath).put(blob);

        task.snapshot.ref.getDownloadURL().then(async (url) => {
          await firebaseFirestore
            .collection("users")
            .doc(firebaseAuth.currentUser.uid)
            .update({
              avatar: url,
            });
        });
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  render() {
    return (
      <View>
        <Avatar
          showEditButton
          source={{
            uri:
              this.state.avatar ||
              "https://avatars.dicebear.com/api/jdenticon/kushadckj@gmail.com.svg",
          }}
          style={{ width: 100, height: 100 }}
          size="large"
          rounded
          onLongPress={() => this.askForUpload()}
        />

        <Text>{this.state.name}</Text>
        <View>
          <DrawerItems {...this.props} />
        </View>
        <TouchableOpacity
          onPress={() => {
            firebaseAuth.signOut();
            this.props.navigation.navigate("Auth");
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
