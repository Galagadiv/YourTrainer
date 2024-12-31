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

import {
	fetchAll,
	fetchById,
	fetchColumnById,
	insertInto,
	deleteById,
	updateById,
} from "../../database/database";

export function InsertName({id}) {
	const db = useSQLiteContext();
	const navigation = useNavigation();
	const [name, setName] = useState("");

	useFocusEffect(
		useCallback(() => {
			const fetchName = async () => {
				if (id !== undefined) {
					try {
						// PROBLEM: if i use .getFirstAsync() it wont find the name,
						// but if i use .getAllAsync() it will return an array with the single name that i need
						const results = await fetchColumnById(db, "Clients", "name", id);
						if (results.length > 0) {
							setName(results[0].name);
						} else {
							Alert.alert("No name found for the given id");
						}
					} catch (error) {
						Alert.alert("Error fetching name:", error);
					}
				}
			};

			fetchName();
		}, [id])
	);

	const addName = async () => {
		try {
			let dateString = new Date().toISOString(); // Повертає дату у форматі ISO 8601 - YYYY-MM-DDTHH:mm:ss.sssZ
			let date = dateString
				.slice(0, dateString.indexOf("T"))
				.split("-")
				.reverse()
				.join("-");

			if (id !== undefined) {
				await updateById(db, "Clients", ["name"], [name, id]);
				Alert.alert("Changed successful");
			} else {
				await insertInto(db, "Clients", ["name", "created_at"], [name, date]);
				Alert.alert("Note added");
				// navigation.goBack();
			}
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
				placeholder="Введіть ім'я..."
				textAlignVertical="center"
				maxLength={32}
			/>
			<TouchableOpacity style={insertStyle.button} onPress={addName}>
				<Text style={insertStyle.buttonText}>Save</Text>
			</TouchableOpacity>
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
