import {
	Alert,
	Button,
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
} from "react-native";

import React, {useState, useCallBack} from "react";
import {SQLiteProvider, useSQLiteContext} from "expo-sqlite";
import {useNavigation, useFocusEffect} from "@react-navigation/native";

import {initializeDB} from "../database/database";

export default function ClientScreen() {
	return (
		<SQLiteProvider databaseName="defaultDB.db" onInit={initializeDB}>
			<InsertName />
		</SQLiteProvider>
	);
}

export function InsertName() {
	const db = useSQLiteContext();
	const navigation = useNavigation();
	const [name, setName] = useState("");

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

	const editName = async () => {
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
			navigation.goBack();
		} catch (error) {
			console.error("Error during insertion:", error);
			Alert.alert("Failed to add note");
		}
	};

	return (
		<View style={insertStyle.field}>
			<TextInput
				style={insertStyle.input}
				multiline={true}
				value={name}
				onChangeText={(text) => setName(text)}
				placeholder="Type in..."
			/>
			<TouchableOpacity style={insertStyle.button} onPress={addName}>
				<Text style={insertStyle.buttonText}>Save</Text>
			</TouchableOpacity>
			<TouchableOpacity style={insertStyle.button} onPress={editName}>
				<Text style={insertStyle.buttonText}>Edit</Text>
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
