import { createDrawerNavigator } from "react-navigation-drawer";
import CustomSideBar from "../Components/CustomSideBar.component";
import SettingsScreen from "../Screens/SettingsScreen";
import { TopTab } from "./Tab";
export const Drawer = createDrawerNavigator(
	{
		Home: {
			screen: TopTab,
		},
		Settings: {
			screen: SettingsScreen,
		},
	},
	{
		contentComponent: CustomSideBar,
		swipeDistanceThreshold: 0.5,
	},
	{
		initialRouteName: "Home",
	}
);
