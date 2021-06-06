import { createBottomTabNavigator } from "react-navigation-tabs";
import BookRequest from "../Screens/BookRequest";
import { Stack } from "./Stack";

export const TopTab = createBottomTabNavigator(
	{
		RequestScreen: {
			screen: BookRequest,
		},
		DonateScreen: {
			screen: Stack,
		},
	},
	{
		initialRouteName: "RequestScreen",
		swipeEnabled: true,
	}
);
