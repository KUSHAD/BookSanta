import { StatusBar } from "expo-status-bar";
import React from "react";
import WelcomeScreen from "./Screens/WelcomeScreen";
export default function App() {
	return (
		<>
			<StatusBar style='auto' translucent />
			<WelcomeScreen />
		</>
	);
}
