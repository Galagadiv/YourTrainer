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

	const [time, setTime] = useState("");

	const handleTimeChange = (text) => {
		// Видаляємо всі символи, крім цифр
		const cleanText = text.replace(/[^0-9]/g, "");

		// Форматуємо у вигляді "год:хв"
		if (cleanText.length <= 2) {
			setTime(cleanText); // До 2 цифр: тільки години
		} else {
			const hours = cleanText.slice(0, 2); // Перші 2 цифри - години
			const minutes = cleanText.slice(2, 4); // Наступні 2 цифри - хвилини
			if (parseInt(hours) < 23) {
				if (parseInt(minutes) < 59) {
					setTime(`${hours}:${minutes}`);
				}
			} else {
				setTime("11:00");
			}
		}
	};

	return (
		<View style={[dataPickStyle.container, {flex: 1}]}>
			<Calendar
				firstDay={1} // Початок тижня з понеділка
				onDayPress={(day) => {
					setSelectedDate(day.dateString);
				}}
				style={basicTheme.container}
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
			<View style={dataPickStyle.title}>
				<TextInput
					style={[
						{
							width: "100%",
							height: 100,
							justifyContent: "center",
							textAlign: "center",
							fontSize: 40,
							letterSpacing: 5,
						},
						basicTheme.container,
					]}
					value={time}
					onChangeText={handleTimeChange}
					keyboardType="numeric" // Тільки цифри
					maxLength={5} // Максимум 5 символів (години:хвилини)
					placeholder="00:00"
					placeholderTextColor="#999"
				/>
			</View>
			<View
				style={[basicTheme.container, {backgroundColor: basicTheme.fourth_cl}]}
			>
				<Text style={basicTheme.text}>
					Дата тренування: {selectedDate} {time}
				</Text>
			</View>
			<View style={{flexDirection: "row"}}>
				<TouchableOpacity onPress={() => navigator.goBack()}>
					<Text style={dataPickStyle.emptyDataText}>Скасувати</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigator.goBack()}>
					<Text style={dataPickStyle.emptyDataText}>Додати</Text>
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
	title: {
		backgroundColor: basicTheme.fourth_cl,
	},
});
