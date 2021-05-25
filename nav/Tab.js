import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import BookDonate from "../Screens/BookDonate";
import BookRequest from "../Screens/BookRequest";

export const TopTab = createMaterialTopTabNavigator(
	{
		RequestScreen: {
			screen: BookRequest,
		},
		DonateScreen: {
			screen: BookDonate,
		},
	},
	{
		initialRouteName: "RequestScreen",
		swipeEnabled: true,
	}
);
