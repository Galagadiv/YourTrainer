import {
	Alert,
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
} from "~/database/database";

import {InsertName} from "~/components/ClientScreen/InsertName";
import {ClientData} from "~/components/ClientScreen/ClientData";

export default function ClientScreen({route}) {
	const {id} = route.params;
	return (
		<ScrollView>
			<InsertName id={id} />
			<ClientData id={id} />
		</ScrollView>
	);
}
