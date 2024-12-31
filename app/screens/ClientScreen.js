import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	ScrollView,
	Pressable,
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
} from "~/database/database";

import {InsertName} from "~/components/ClientScreen/InsertName";

import {basicTheme} from "~/utils/theme";

export default function ClientScreen({route}) {
	const {id} = route.params;
	return (
		<ScrollView>
			<InsertName id={id} />
			<ClientData id={id} />
		</ScrollView>
	);
}

export function ClientData({id}) {
	return id !== undefined ? (
		<View>
			<View style={dataStyle.field}>
				<Text style={[basicTheme.text]}>Наступне тренування</Text>
			</View>
			<Pressable
				style={dataStyle.delClientButton}
				onPress={() => console.log("Edit")}
			>
				<Text style={dataStyle.delClientButtonText}>Видалити клієнта</Text>
			</Pressable>
		</View>
	) : (
		<View style={dataStyle.emptyData}>
			<Text style={dataStyle.emptyDataText}>Заповніть та збережіть ім'я,</Text>
			<Text style={dataStyle.emptyDataText}>щоб продовжити роботу</Text>
		</View>
	);
}

// const main = "#295F98";
// const second = "#CDC2A5";
// const third = "#E1D7C6";
// const fourth = "#EAE4DD";
// const white = "#fff";
// const red = "#AD2E2C";

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
