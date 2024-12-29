export const initializeDB = async (db) => {
	try {
		await db.execAsync(`
            PRAGMA journal_mode = WAL;
            DROP TABLE Users;
            CREATE TABLE IF NOT EXISTS Users (
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
