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
	fetchColumnById,
	insertInto,
	updateById,
} from "../database/database";

import {InsertName} from "../components/ClientScreen/InsertName";

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
		<View style={dataStyle.field}>
			<Text>Client Data</Text>
		</View>
	) : (
		<View style={dataStyle.emptyData}>
			<Text style={dataStyle.emptyDataText}>Заповніть та збережіть ім'я,</Text>
			<Text style={dataStyle.emptyDataText}>щоб продовжити роботу</Text>
		</View>
	);
}

const main = "#295F98";
const second = "#CDC2A5";
const third = "#E1D7C6";
const fourth = "#EAE4DD";
const white = "#fff";

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
		marginVertical: 6,
		alignItems: "center",
		backgroundColor: fourth,
		borderTopWidth: 0.5,
		// marginHorizontal: 4,
	},
});
