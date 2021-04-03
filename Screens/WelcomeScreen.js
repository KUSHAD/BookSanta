import React, { Component } from "react";
import {
	Alert,
	Button,
	Image,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
} from "react-native";
import { firebaseAuth } from "../config";
export default class WelcomeScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			emaile: "",
			password: "",
		};
	}

	signup = async (email, password) => {
		await firebaseAuth
			.createUserWithEmailAndPassword(email, password)
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
	};

	login = async (email, password) => {
		await firebaseAuth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				Platform.OS === "web"
					? alert("You Have Been Succesfully Login")
					: Alert.alert("Success", "You Have Been Succesfully Login");
			})
			.catch((error) => {
				Platform.OS === "web"
					? alert(error.message)
					: Alert.alert("Error", error.message);
			});
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<SafeAreaView>
					<Image
						source={require("../assets/books.gif")}
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
						keyboardType='email-address'
						keyboardAppearance='default'
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
						title='Login'
						onPress={() => this.login(this.state.email, this.state.password)}
					/>
					<SafeAreaView
						style={{
							marginBottom: 10,
						}}
					/>
					<Button
						title='Signup'
						onPress={() => this.signup(this.state.email, this.state.password)}
					/>
				</SafeAreaView>
			</SafeAreaView>
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
		fontVariant: "bold",
		textDecorationLine: "underline",
		textAlign: "center",
	},
	subtitle: {
		fontSize: 15,
		fontVariant: "100",
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
