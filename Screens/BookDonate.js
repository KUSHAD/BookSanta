import React from "react";
import { FlatList, Text, View, Button } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import { firebaseFirestore } from "../config";
export default class BookDonate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requestedBooks: [],
    };
  }

  getTheBooksFromDb = async () => {
    await firebaseFirestore
      .collection("requests")
      .get()
      .then((snapshot) => {
        const docs = snapshot.docs.map((doc) => doc.data());
        console.log(docs);
        this.setState({ requestedBooks: docs });
      });
  };
  componentDidMount() {
    this.getTheBooksFromDb();
  }
  render() {
    return (
      <>
        <CustomHeader {...this.props} />
        <FlatList
          ItemSeparatorComponent={() => (
            <View
              style={{
                boderWidth: 2,
                borderColor: "black",
              }}
            />
          )}
          data={this.state.requestedBooks}
          renderItem={({ item, index }) => (
            <View key={item.uid}>
              <Text>{item.bookName}</Text>
              <Text>{item.reason}</Text>
              <Button
                title="View"
                onPress={() => {
                  this.props.navigation.navigate("MoreDetails", {
                    details: item,
                  });
                }}
              />
            </View>
          )}
        />
      </>
    );
  }
}
