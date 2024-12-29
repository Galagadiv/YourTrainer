import * as React from "react";
import {View, Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import HomeScreen from "./app/screens/HomeScreen";
import ClientScreen from "./app/screens/ClientScreen";
import {initializeDB} from "./app/database/database";
import {SQLiteProvider, useSQLiteContext} from "expo-sqlite";

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
