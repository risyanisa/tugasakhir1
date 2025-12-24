
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

    // Pastikan kolom profil tersedia meski tabel sudah pernah dibuat
    const userColumns = await tx.getAllAsync("PRAGMA table_info(users)");
    const hasName = userColumns.some((c: any) => c.name === "name");
    const hasEmail = userColumns.some((c: any) => c.name === "email");
    const hasPhoto = userColumns.some((c: any) => c.name === "photoUri");

    if (!hasName) {
      await tx.execAsync("ALTER TABLE users ADD COLUMN name TEXT");
    }
    if (!hasEmail) {
      await tx.execAsync("ALTER TABLE users ADD COLUMN email TEXT");
    }
    if (!hasPhoto) {
      await tx.execAsync("ALTER TABLE users ADD COLUMN photoUri TEXT");
    }
  });
};
