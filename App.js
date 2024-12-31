import * as React from "react";
import {useEffect} from "react";
import {View, Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import HomeScreen from "~/screens/HomeScreen";
import ClientScreen from "~/screens/ClientScreen";
import {initializeDB} from "~/database/database";
import {SQLiteProvider} from "expo-sqlite";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<SQLiteProvider databaseName="defaultDB.db" onInit={initializeDB}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Client" component={ClientScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</SQLiteProvider>
	);
}
