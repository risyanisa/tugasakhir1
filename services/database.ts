
import type { SQLiteDatabase } from "expo-sqlite";
import * as SQLite from "expo-sqlite";

export const db: SQLiteDatabase = SQLite.openDatabaseSync("money_manager.db");

export const initDB = async () => {
  await db.withExclusiveTransactionAsync(async (tx: any) => {
    await tx.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
      );
    `);

    await tx.execAsync(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        amount INTEGER,
        category TEXT,
        note TEXT,
        date TEXT
      );
    `);
  });
};
