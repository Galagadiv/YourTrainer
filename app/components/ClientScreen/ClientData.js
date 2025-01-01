import React, {useState, useCallback} from "react";
import {useSQLiteContext} from "expo-sqlite";
import {useNavigation, useFocusEffect} from "@react-navigation/native";
import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	ScrollView,
	Modal,
} from "react-native";

import {
	fetchAll,
	fetchById,
	fetchColumnById,
	insertInto,
	deleteById,
	updateById,
} from "~/database/database";
import {basicTheme} from "~/utils/theme";

export function ClientData({id}) {
	const db = useSQLiteContext();
	const navigation = useNavigation();

	const delClient = async () => {
		try {
			await deleteById(db, "Clients", id);
			navigation.replace("Home");
		} catch (error) {
			console.error(error);
		}
	};

	return id !== undefined ? (
		<View>
			<View style={dataStyle.field}>
				<TouchableOpacity onPress={() => navigation.navigate("DatePick", {id})}>
					<Text style={[basicTheme.text]}>
						Наступне тренування: виберіть дату
					</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity style={dataStyle.delClientButton} onPress={delClient}>
				<Text style={dataStyle.delClientButtonText}>Видалити клієнта</Text>
			</TouchableOpacity>
		</View>
	) : (
		<View style={dataStyle.emptyData}>
			<Text style={dataStyle.emptyDataText}>Заповніть та збережіть ім'я,</Text>
			<Text style={dataStyle.emptyDataText}>щоб продовжити роботу</Text>
		</View>
	);
}

const dataStyle = StyleSheet.create({
	emptyData: {
		height: 550,
		padding: 10,
		marginVertical: 6,
		alignItems: "center",
		justifyContent: "center",
		borderTopWidth: 0.5,
	},
	emptyDataText: {
		fontSize: 24,
		fontWeight: 500,
	},
	field: {
		padding: 10,
		marginTop: 6,
		// alignItems: "center",
		backgroundColor: basicTheme.fourth_cl,
		borderTopWidth: 0.5,
		// marginHorizontal: 4,
	},
	calendar: {
		backgroundColor: "#ffffff",
		calendarBackground: "#f0f0f0",
		textSectionTitleColor: "#b6c1cd",
		dayTextColor: "#2d4150",
		todayTextColor: "#00adf5",
		selectedDayBackgroundColor: "#00adf5",
		selectedDayTextColor: "#ffffff",
	},
	delClientButton: {
		flex: 1,
		width: "100%",
		paddingVertical: 6,
		backgroundColor: basicTheme.white_cl,
		borderColor: "#860A35",
		borderTopWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	delClientButtonText: {
		color: basicTheme.error_cl,
		fontSize: 20,
		fontWeight: 500,
		textAlign: "center",
	},
});
