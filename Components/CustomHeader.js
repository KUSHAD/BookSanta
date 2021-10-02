import React, { Component } from "react";
import { View } from "react-native";
import { Header, Icon, Badge } from "react-native-elements";
import { firebaseFirestore } from "../config";

class CustomHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifyValue: "",
    };
  }

  getUnreadNotifications() {
    firebaseFirestore
      .collection("all-notifications")
      .where("status", "==", "unread")
      .onSnapshot(({ docs }) => {
        const unreadNotifications = docs.length;
        this.setState({ notifyValue: unreadNotifications });
      });
  }

  componentDidMount() {
    this.getUnreadNotifications();
  }

  BellIconWithBadge = (props) => {
    return (
      <View>
        <Icon
          name="bell"
          type="font-awesome"
          color="#696969"
          size={25}
          onPress={() => props.navigation.navigate("NotificationScreen")}
        />
        <Badge
          value={this.state.notifyValue}
          containerStyle={{
            position: "absolute",
            top: -4,
            right: -4,
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <Header
        leftComponent={
          <Icon
            name="bars"
            type="font-awesome"
            color="#696969"
            onPress={() => this.props.navigation.toggleDrawer()}
          />
        }
        centerComponent={{
          text: this.props.title,
          style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
        }}
        backgroundColor="#EAF8FE"
        rightComponent={<this.BellIconWithBadge {...this.props} />}
      />
    );
  }
}

export default CustomHeader;
