// Ініціалізація БД
import * as SQLite from "expo-sqlite";
import {useSQLiteContext} from "expo-sqlite";

const db = SQLite.openDatabaseAsync("defaultDB.db");

export const initializeDB = async () => {
	try {
		await (
			await db
		).runAsync(`
            PRAGMA journal_mode = WAL;
            // DROP TABLE Clients;
            CREATE TABLE IF NOT EXISTS Clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            created_at TEXT
            );      
        `);
		console.log("DB connection success");
	} catch (error) {
		console.log("error", error);
	}
};

// -----------------------------------------------------
// Запускає будь-який запит до БД/
// Два дублікати через те що .getAllAsync() тільки для виводу, а
// .runAsync() для зміни в БД

export const runQueryShow = async (sqliteContext, query, params = []) => {
	try {
		const result = await sqliteContext.getAllAsync(query, params);
		// console.log("Show Result:", result);
		// return result.rows;
		return result || [];
	} catch (error) {
		console.error("SQL Show Error:", error);
		throw error;
	}
};

export const runQueryChange = async (sqliteContext, query, params = []) => {
	try {
		const result = await sqliteContext.runAsync(query, params);
		console.log("Change:", result);
		return result.rows;
	} catch (error) {
		console.error("SQL Change Error:", error);
		throw error;
	}
};
// -----------------------------------------------------
// Виводить всі записи з табл
export const fetchAll = (sqliteContext, tableName, params = []) => {
	const query = `SELECT * FROM ${tableName}`;
	return runQueryShow(sqliteContext, query, params);
};

// -----------------------------------------------------
// Виводить запис за ID
export const fetchById = (sqliteContext, tableName, id) => {
	const query = `SELECT * FROM ${tableName} WHERE id = ?`;
	return runQueryShow(sqliteContext, query, [id]);
};

// -----------------------------------------------------
// Виводить конкретний стовпець за ID
export const fetchColumnById = (sqliteContext, tableName, column, id) => {
	const query = `SELECT ${column} FROM ${tableName} WHERE id = ?`;
	return runQueryShow(sqliteContext, query, [id]);
};

// -----------------------------------------------------
// Додає запис до табл
export const insertInto = (sqliteContext, tableName, columns, values) => {
	const placeholders = columns.map(() => "?").join(", ");
	const query = `INSERT INTO ${tableName} (${columns.join(
		", "
	)}) VALUES (${placeholders})`;
	return runQueryChange(sqliteContext, query, values);
};

// -----------------------------------------------------
// Видаляє запис за ID
export const deleteById = (sqliteContext, tableName, id) => {
	const query = `DELETE FROM ${tableName} WHERE id = ?`;
	return runQueryChange(sqliteContext, query, [id]);
};

// -----------------------------------------------------
// Оновлює запис за ID
export const updateById = (sqliteContext, tableName, columns, values) => {
	const updates = columns.map((col) => `${col} = ?`).join(", ");
	const query = `UPDATE ${tableName} SET ${updates} WHERE id = ?`;
	return runQueryChange(sqliteContext, query, values);
};
// -----------------------------------------------------

export default {
	runQueryShow,
	runQueryChange,
	fetchAll,
	fetchById,
	fetchColumnById,
	insertInto,
	deleteById,
	updateById,
};
