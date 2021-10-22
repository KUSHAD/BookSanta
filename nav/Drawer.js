import { createDrawerNavigator } from "react-navigation-drawer";
import CustomSideBar from "../Components/CustomSideBar.component";
import MyDonations from "../Screens/MyDonations";
import MyReceivedBooks from "../Screens/MyReceivedBooks";
import Notification from "../Screens/Notification";
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
    MyDonations: {
      screen: MyDonations,
    },
    NotificationScreen: {
      screen: Notification,
    },
    MyReceivedBooks: {
      screen: MyReceivedBooks,
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
