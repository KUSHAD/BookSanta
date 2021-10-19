import React, { Component } from "react";
import { Text, View, Dimensions, Animated, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { SwipeListView } from "react-native-swipe-list-view";

import { firebaseFirestore } from "../config";
class SwipeableFlatlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allNotifs: this.props.allNotifs,
    };
  }

  onSwipeValueChange = (swipeData) => {
    let allNotification = this.state.allNotifs;
    const { key, value } = swipeData;
    if (value < -Dimensions.get("window").width) {
      const newData = [...allNotification];
      console.log({ a: key });
      this.updateMarkAsRead(key);
      newData.splice(key, 1);
      this.setState({
        allNotifs: newData,
      });
    }
  };

  updateMarkAsRead = async (_id) => {
    await firebaseFirestore.collection("all-notifications").doc(_id).update({
      status: "read",
    });
  };

  renderItem = (data) => (
    <Animated.View>
      <ListItem
        titleStyle={{ color: "black", fontWeight: "bold" }}
        subtitle={data.item.message}
        bottomDivider
      >
        <ListItem.Chevron name="book" type="font-awesome" color="#696969" />
        <ListItem.Title>{data.item.message}</ListItem.Title>
      </ListItem>
    </Animated.View>
  );
  renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Mark as read</Text>
      </View>
    </View>
  );

  render() {
    return (
      <SwipeListView
        keyExtractor={(item) => item.id}
        disableRightSwipe
        data={this.state.allNotifs}
        renderItem={this.renderItem}
        renderHiddenItem={this.renderHiddenItem}
        rightOpenValue={-Dimensions.get("window").width}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onSwipeValueChange={this.onSwipeValueChange}
      />
    );
  }
}

export default SwipeableFlatlist;

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
  backTextWhite: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    alignSelf: "flex-start",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#29b6f6",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 100,
  },
  backRightBtnRight: { backgroundColor: "#29b6f6", right: 0 },
});
