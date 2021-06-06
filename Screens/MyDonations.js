import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { firebaseFirestore, firebaseAuth } from "../config";
class MyDonations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			donations: [],
		};
	}
	async componentDidMount() {
		await firebaseFirestore
			.collection("all-donations")
			.get()
			.then((snapshot) => {
				const docs = snapshot.docs.map((doc) => doc.data());
				console.log(docs);
				this.setState({ donations: docs });
			});
	}

	render() {
		return (
			<FlatList
				renderItem={({ item }) => (
					<View>
						<Text>Book Name :-{item.bookName}</Text>
						<Text>Target userId :- {item.userId}</Text>
						<Button title='Send Book' />
					</View>
				)}
				data={this.state.donations}
			/>
		);
	}
}
export default MyDonations;
