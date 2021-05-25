import { createDrawerNavigator } from "react-navigation-drawer";
import CustomSideBar from "../Components/CustomSideBar.component";
import { TopTab } from "./Tab";

export const Drawer = createDrawerNavigator(
	{
		Home: {
			screen: TopTab,
		},
	},
	{
		contentComponent: CustomSideBar,
	},
	{
		initialRouteName: "Home",
	}
);
