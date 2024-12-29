import {
	Alert,
	Button,
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";

import React, {useState, useCallback} from "react";
import {useSQLiteContext} from "expo-sqlite";
import {useNavigation, useFocusEffect} from "@react-navigation/native";

export default function ClientScreen({route}) {
	const {id} = route.params;
	return (
		<ScrollView>
			<InsertName id={id} />
			<ClientData id={id} />
		</ScrollView>
	);
}

export function InsertName({id}) {
	const db = useSQLiteContext();
	const navigation = useNavigation();
	const [name, setName] = useState("");

	// id !== undefined
	// 	? useFocusEffect(
	// 			useCallback(() => {
	// 				(async () => {
	// 					await fetchName();
	// 				})();
	// 			}, [])
	// 	  )
	// 	: console.log("Add mode");

	// const fetchName = async () => {
	// 	try {
	// 		const results = await db.getAllAsync(
	// 			"SELECT name FROM Users WHERE id = ?",
	// 			[id]
	// 		);

	// 		setName(results);
	// 		console.log("results", name);
	// 	} catch (error) {
	// 		console.log("error", error);
	// 	}
	// };

	useFocusEffect(
		useCallback(() => {
			const fetchName = async () => {
				if (id !== undefined) {
					try {
						// PROBLEM: if i use .getFirstAsync() it wont find the name,
						// but if i use .getAllAsync() it will return an array with the single name that i need
						const results = await db.getAllAsync(
							"SELECT name FROM Users WHERE id = ?",
							id
						);
						if (results.length > 0) {
							setName(results[0].name);
						} else {
							console.log("No name found for the given id");
						}
					} catch (error) {
						console.error("Error fetching name:", error);
					}
				} else {
					console.log("Add mode");
				}
			};

			fetchName();
		}, [id])
	);

	const addName = async () => {
		let dateString = new Date().toISOString(); // Повертає дату у форматі ISO 8601 - YYYY-MM-DDTHH:mm:ss.sssZ
		let date = dateString
			.slice(0, dateString.indexOf("T"))
			.split("-")
			.reverse()
			.join("-");

		try {
			await db.runAsync(`INSERT INTO Users (name, created_at) VALUES (?, ?)`, [
				name,
				date,
			]);
			console.log("Insert successful");
			Alert.alert("Note added");
			// navigation.goBack();
		} catch (error) {
			console.error("Error during insertion:", error);
			Alert.alert("Failed to add note");
		}
	};

	return (
		<View style={insertStyle.field}>
			<TextInput
				style={insertStyle.input}
				value={name}
				onChangeText={(text) => setName(text)}
				placeholder="Type in..."
				textAlignVertical="center"
				maxLength={32}
			/>
			<TouchableOpacity style={insertStyle.button} onPress={addName}>
				<Text style={insertStyle.buttonText}>Save</Text>
			</TouchableOpacity>
			<TouchableOpacity style={insertStyle.button} onPress={addName}>
				<Text style={insertStyle.buttonText}>Edit</Text>
			</TouchableOpacity>
		</View>
	);
}

export function ClientData({id}) {
	return (
		<View style={dataStyle.field}>
			<Text>Client Data</Text>
		</View>
	);
}

const main = "#295F98";
const second = "#CDC2A5";
const third = "#E1D7C6";
const fourth = "#EAE4DD";
const white = "#fff";

const insertStyle = StyleSheet.create({
	field: {
		height: 50,
		flexDirection: "row",
		marginVertical: 6,
		marginHorizontal: 4,
		gap: 10,
	},
	input: {
		flex: 1,
		fontSize: 16,
		textAlignVertical: "top",
		borderWidth: 1,
		borderRadius: 5,
		width: "100%",
	},
	button: {
		width: 50,
		height: 50,
		borderRadius: 5,
		backgroundColor: main,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: white,
	},
});

const dataStyle = StyleSheet.create({
	field: {
		padding: 10,
		marginVertical: 6,
		alignItems: "center",
		backgroundColor: fourth,
		borderTopWidth: 0.5,
		// marginHorizontal: 4,
	},
});
