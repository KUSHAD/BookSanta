import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { firebaseAuth, firebaseFirestore, time } from "../config";
export default class BookRequest extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			bookName: "",
			reason: "",
		};
	}
	uuid = () => {
		return Math.random().toString(36).substring(7);
	};
	handleSubmit = () => {
		console.log(time.now);
		const { bookName, reason } = this.state;
		const uid = this.uuid();
		firebaseFirestore.collection("requests").add({
			bookName,
			reason,
			uid,
			email: firebaseAuth.currentUser.email,
		});
	};
	render() {
		return (
			<View style={styles.container}>
				<View
					style={{
						width: "80%",
					}}>
					<TextInput
						placeholder='Bookname'
						onChangeText={(text) => {
							this.setState({
								bookName: text,
							});
						}}
						value={this.state.bookName}
						style={styles.input}
					/>
					<TextInput
						placeholder='Reason For Book Request'
						onChangeText={(text) => {
							this.setState({
								reason: text,
							});
						}}
						value={this.state.reason}
						style={styles.input}
					/>
					<Button title='Submit Request' onPress={this.handleSubmit} />
				</View>
			</View>
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
