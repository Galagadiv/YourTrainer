import * as React from "react";
import {useEffect} from "react";
import {View, Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import HomeScreen from "~/screens/HomeScreen";
import ClientScreen from "~/screens/ClientScreen";
import DatePickScreen from "~/screens/DatePickScreen";

import {initializeDB} from "~/database/database";
import {SQLiteProvider} from "expo-sqlite";
import {basicTheme} from "./app/utils/theme";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<SQLiteProvider databaseName="defaultDB.db" onInit={initializeDB}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={{
							title: "Головна сторінка",
							headerStyle: {
								backgroundColor: basicTheme.main_cl, // Колір фону заголовка
							},
							headerTintColor: basicTheme.white_cl, // Колір тексту і кнопок у заголовку
							headerTitleStyle: {
								fontWeight: "bold", // Стиль тексту
								fontSize: 20,
							},
						}}
					/>
					<Stack.Screen
						name="Client"
						component={ClientScreen}
						options={{
							title: "Клієнт",
							headerStyle: {
								backgroundColor: basicTheme.main_cl, // Колір фону заголовка
							},
							headerTintColor: basicTheme.white_cl, // Колір тексту і кнопок у заголовку
							headerTitleStyle: {
								fontWeight: "bold", // Стиль тексту
								fontSize: 20,
							},
						}}
					/>
					<Stack.Screen
						name="DatePick"
						component={DatePickScreen}
						options={{
							title: "Оберіть дату тренування",
							headerStyle: {
								backgroundColor: basicTheme.main_cl, // Колір фону заголовка
							},
							headerTintColor: basicTheme.white_cl, // Колір тексту і кнопок у заголовку
							headerTitleStyle: {
								fontWeight: "bold", // Стиль тексту
								fontSize: 20,
							},
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SQLiteProvider>
	);
}
