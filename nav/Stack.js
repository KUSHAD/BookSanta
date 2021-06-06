import { createStackNavigator } from "react-navigation-stack";
import BookDonate from "../Screens/BookDonate";
import MoreDetailsAboutTheRequest from "../Screens/MoreDetailsAboutTheRequest";
export const Stack = createStackNavigator(
	{
		Donations: {
			screen: BookDonate,
		},
		MoreDetails: {
			screen: MoreDetailsAboutTheRequest,
		},
	},
	{
		initialRouteName: "Donations",
	}
);
