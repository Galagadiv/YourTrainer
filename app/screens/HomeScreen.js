import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, {useState, useCallback} from "react";
import {useSQLiteContext} from "expo-sqlite";
import {useNavigation, useFocusEffect} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import {initializeDB} from "../database/database";

export default function HomeScreen() {
	return <ClientList />;
}

export function ClientList() {
	const [clientList, setClientList] = useState([]);
	const db = useSQLiteContext();
	const navigation = useNavigation();

	useFocusEffect(
		useCallback(() => {
			(async () => {
				// console.log("db object:", db);
				await fetchClients();
				// console.log("fetching notes");
			})();
		}, [])
	);

	const fetchClients = async () => {
		try {
			const results = await db.getAllAsync(FirstToLast);
			setClientList(results);
		} catch (error) {
			console.log("error", error);
		}
	};
	const viewData = async (id) => {
		try {
			navigation.navigate("Client", {id});
		} catch (error) {
			console.error(error);
		}
	};

	const FirstToLast = "SELECT * FROM Users";
	const LastToFirst = "SELECT * FROM Users ORDER BY id DESC";

	// console.log(navigation.getState().routes.length); // Виводить кількість екранів в стеку
	return (
		<SafeAreaView style={styles.field}>
			{/* Чому не працює частина пустого списку? */}
			{Array.isArray(clientList) && clientList.length > 0 ? (
				<ScrollView>
					{clientList.map((item, index) => {
						return (
							<TouchableOpacity
								key={index}
								style={styles.item}
								onPress={() => viewData(item.id)}
							>
								<Text style={styles.itemName}>{item.name}</Text>
								<Text style={styles.itemDate}>{item.created_at}</Text>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			) : (
				<View style={styles.emptyList}>
					<Text style={styles.itemName}>Список клієнтів порожній</Text>
				</View>
			)}

			<TouchableOpacity
				style={styles.addClientButton}
				onPress={() => navigation.navigate("Client", {id: undefined})} // додивитися цей момент
			>
				<Text style={styles.addClientButtonText}>+</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const main = "#295F98";
const second = "#CDC2A5";
const third = "#E1D7C6";
const fourth = "#EAE4DD";
const white = "#fff";

const styles = StyleSheet.create({
	field: {
		flex: 1,
		padding: 10,
		position: "relative",
		height: "100%",
		backgroundColor: fourth,
	},
	item: {
		backgroundColor: third,
		padding: 10,
		marginVertical: 6,
		marginHorizontal: 4,
		borderRadius: 5,
		borderWidth: 1,
	},
	itemName: {
		fontSize: 24,
	},
	itemDate: {
		fontSize: 12,
	},
	emptyList: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	addClientButton: {
		position: "absolute",
		backgroundColor: main,
		bottom: 20,
		right: 20,
		width: 60,
		height: 60,
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "center",
	},
	addClientButtonText: {
		color: white,
		fontSize: 50,
		lineHeight: 60,
		includeFontPadding: false,
		textAlignVertical: "center",
	},
});
