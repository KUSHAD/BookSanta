import { StatusBar } from "expo-status-bar";
import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Drawer } from "./nav/Drawer";
import { TopTab } from "./nav/Tab";
import WelcomeScreen from "./Screens/WelcomeScreen";
export default function App() {
  return (
    <>
      <StatusBar style="auto" translucent />
      <AppContainer />
    </>
  );
}

const SwitchNav = createSwitchNavigator({
  Auth: WelcomeScreen,
  Drawer: Drawer,
  TopTab: TopTab,
});

const AppContainer = createAppContainer(SwitchNav);
