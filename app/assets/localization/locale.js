import {LocaleConfig} from "react-native-calendars";

export const useCalendarLocale = () => {
	LocaleConfig.locales["ua"] = {
		monthNames: [
			"Січень",
			"Лютий",
			"Березень",
			"Квітень",
			"Травень",
			"Червень",
			"Липень",
			"Серпень",
			"Вересень",
			"Жовтень",
			"Листопад",
			"Грудень",
		],
		monthNamesShort: [
			"Січ",
			"Лют",
			"Бер",
			"Квіт",
			"Трав",
			"Черв",
			"Лип",
			"Серп",
			"Вер",
			"Жовт",
			"Лист",
			"Груд",
		],
		dayNames: [
			"Неділя",
			"Понеділок",
			"Вівторок",
			"Середа",
			"Четвер",
			"П’ятниця",
			"Субота",
		],
		dayNamesShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
		today: "Сьогодні",
	};

	LocaleConfig.defaultLocale = "ua";
};
