import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Pressable,
} from "react-native";

import {useSQLiteContext} from "expo-sqlite";
import {Calendar} from "react-native-calendars";
import React, {useState, useCallback} from "react";
import {useNavigation, useFocusEffect} from "@react-navigation/native";

import {
	fetchAll,
	fetchById,
	fetchColumnById,
	insertInto,
	deleteById,
	updateById,
} from "~/database/database";

import {basicTheme} from "~/utils/theme";

export default function DatePickScreen({route}) {
	const {id} = route.params;
	const navigator = useNavigation();
	const [selectedDate, setSelectedDate] = useState("");

	return (
		<View style={dataPickStyle.container}>
			<View>
				<Calendar
					onDayPress={(day) => {
						setSelectedDate(day.dateString);
					}}
					theme={{...dataPickStyle.calendar}}
					dayComponent={({date, state}) => (
						<DayItem
							date={date}
							state={state}
							selectedDate={selectedDate} // Передаємо стан
							setSelectedDate={setSelectedDate} // Передаємо функцію оновлення
						/>
					)}
				/>
				<TouchableOpacity onPress={() => navigator.goBack()}>
					<Text style={dataPickStyle.emptyDataText}>Закрити</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export function DayItem({date, state, selectedDate, setSelectedDate}) {
	const isSelected = date.dateString === selectedDate;

	return (
		<Pressable
			style={{
				width: 50,
				height: 50,
				borderRadius: 25,
				backgroundColor: isSelected ? basicTheme.main_cl : basicTheme.fourth_cl,
				justifyContent: "center",
				alignItems: "center",
			}}
			onPress={() => setSelectedDate(date.dateString)} // Встановлення дати при натисканні
		>
			<Text
				style={{
					textAlign: "center",
					color: isSelected
						? basicTheme.white_cl
						: state === "disabled"
						? "gray"
						: basicTheme.black_cl,
					fontSize: 16,
				}}
			>
				{date.day}
			</Text>
		</Pressable>
	);
}

const dataPickStyle = StyleSheet.create({
	field: {
		flex: 1,
	},
	calendar: {
		backgroundColor: basicTheme.fourth_cl,
		calendarBackground: basicTheme.fourth_cl,
		arrowColor: basicTheme.main_cl,
		disabledArrowColor: basicTheme.third_cl,
		textSectionTitleColor: basicTheme.black_cl,
		textSectionTitleDisabledColor: basicTheme.third_cl,
		todayTextColor: basicTheme.warning_cl,
		textDayFontSize: 18,
		textDayHeaderFontSize: 18,
		textMonthFontSize: 22,
		selectedDayBackgroundColor: basicTheme.main_cl,
		selectedDayTextColor: basicTheme.white_cl,
	},
	emptyDataText: {
		fontSize: 20,
	},
});
