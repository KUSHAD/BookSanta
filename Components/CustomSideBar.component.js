import React, { Component } from "react";
import { DrawerItems } from "react-navigation-drawer";
import { View, Text, TouchableOpacity } from "react-native";
import { firebaseAuth } from "../config";
export default class CustomSideBar extends Component {
	render() {
		return (
			<View>
				<View>
					<DrawerItems {...this.props} />
				</View>
				<TouchableOpacity
					onPress={() => {
						firebaseAuth.signOut();
						this.props.navigation.navigate("Auth");
					}}>
					<Text>Logout</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
