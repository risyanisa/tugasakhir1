import { Share } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { db } from "./database";

// Summary pemasukkan/pengeluaran per hari
export const getDailySummary = async (date: string, setIncome: (v: number) => void, setExpense: (v: number) => void) => {
  await db.withExclusiveTransactionAsync(async (tx: any) => {
    const incomeRows = await tx.getAllAsync(
      "SELECT SUM(amount) as total FROM transactions WHERE type='income' AND date(date) = date(?)",
      [date]
    );
    setIncome(incomeRows[0]?.total || 0);
    const expenseRows = await tx.getAllAsync(
      "SELECT SUM(amount) as total FROM transactions WHERE type='expense' AND date(date) = date(?)",
      [date]
    );
    setExpense(expenseRows[0]?.total || 0);
  });
};

// Summary pemasukkan/pengeluaran per bulan
export const getMonthlySummary = async (year: number, month: number, setIncome: (v: number) => void, setExpense: (v: number) => void) => {
  await db.withExclusiveTransactionAsync(async (tx: any) => {
    const incomeRows = await tx.getAllAsync(
      "SELECT SUM(amount) as total FROM transactions WHERE type='income' AND strftime('%Y', date) = ? AND strftime('%m', date) = ?",
      [year.toString(), month.toString().padStart(2, '0')]
    );
    setIncome(incomeRows[0]?.total || 0);
    const expenseRows = await tx.getAllAsync(
      "SELECT SUM(amount) as total FROM transactions WHERE type='expense' AND strftime('%Y', date) = ? AND strftime('%m', date) = ?",
      [year.toString(), month.toString().padStart(2, '0')]
    );
    setExpense(expenseRows[0]?.total || 0);
  });
};

export const getTotalBalance = async (setBalance: (value: number) => void) => {
  await db.withExclusiveTransactionAsync(async (tx: any) => {
    const rows = await tx.getAllAsync(
      `
      SELECT
        SUM(CASE WHEN type='income' THEN amount ELSE -amount END) AS balance
      FROM transactions
      `,
      []
    );
    setBalance(rows[0]?.balance || 0);
  });
};

export const getSummary = async (
  setIncome: (v: number) => void,
  setExpense: (v: number) => void
) => {
  await db.withExclusiveTransactionAsync(async (tx: any) => {
    const incomeRows = await tx.getAllAsync(
      "SELECT SUM(amount) as total FROM transactions WHERE type='income'",
      []
    );
    setIncome(incomeRows[0]?.total || 0);
    const expenseRows = await tx.getAllAsync(
      "SELECT SUM(amount) as total FROM transactions WHERE type='expense'",
      []
    );
    setExpense(expenseRows[0]?.total || 0);
  });
};

export const deleteTransaction = async (id: number, onSuccess?: () => void) => {
  if (!id) return;

  try {
    await db.withExclusiveTransactionAsync(async (tx: any) => {
      await tx.runAsync("DELETE FROM transactions WHERE id=?", [id]);
    });
    if (onSuccess) onSuccess();
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};

export const getTransactions = async (callback: (transactions: any[]) => void) => {
  await db.withExclusiveTransactionAsync(async (tx: any) => {
    const result = await tx.getAllAsync("SELECT * FROM transactions ORDER BY date DESC");
    callback(result);
  });
};

export const getAllTransactions = async (callback: (transactions: any[]) => void | Promise<void>) => {
  await db.withExclusiveTransactionAsync(async (tx: any) => {
    const result = await tx.getAllAsync("SELECT * FROM transactions ORDER BY date DESC");
    callback(result);
  });
};

export const getUserProfile = async (callback: (user: any) => void) => {
  await db.withExclusiveTransactionAsync(async (tx: any) => {
    try {
      const result = await tx.getAllAsync(
        "SELECT id, username, name, email, photoUri FROM users LIMIT 1"
      );
      if (result.length > 0) {
        const row = result[0];
        callback({
          id: row.id,
          username: row.username,
          name: row.name || row.username || "User Pengguna",
          email: row.email || "user@financial.app",
          photoUri: row.photoUri || "",
        });
      }
    } catch (e) {
      console.log("Error fetching user profile:", e);
    }
  });
};

export const updateUserProfile = async (
  name: string,
  email: string,
  photoUri: string,
  callback?: () => void
) => {
  await db.withExclusiveTransactionAsync(async (tx: any) => {
    try {
      const result = await tx.getAllAsync("SELECT * FROM users LIMIT 1");
      if (result.length > 0) {
        await tx.runAsync(
          "UPDATE users SET name = ?, email = ?, photoUri = ? WHERE id = ?",
          [name, email, photoUri, result[0].id]
        );
      } else {
        const username = name || "user";
        await tx.runAsync(
          "INSERT INTO users (username, password, name, email, photoUri) VALUES (?, ?, ?, ?, ?)",
          [username, "", name, email, photoUri]
        );
      }
      if (callback) callback();
    } catch (e) {
      console.error("Error updating user profile:", e);
    }
  });
};

const escapeCsv = (value: any) => {
  if (value === null || value === undefined) return "";
  const stringValue = String(value);
  if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

export const exportTransactionsToCsv = async () => {
  let rows: any[] = [];
  await db.withExclusiveTransactionAsync(async (tx: any) => {
    rows = await tx.getAllAsync(
      "SELECT id, date, type, category, amount, note FROM transactions ORDER BY date DESC"
    );
  });

  const header = ["id", "date", "type", "category", "amount", "note"];
  const csv = [
    header.join(","),
    ...rows.map((r) =>
      [
        escapeCsv(r.id),
        escapeCsv(r.date),
        escapeCsv(r.type),
        escapeCsv(r.category),
        escapeCsv(r.amount),
        escapeCsv(r.note),
      ].join(",")
    ),
  ].join("\n");

  const fileUri = `${FileSystem.documentDirectory || ""}transactions.csv`;
  await FileSystem.writeAsStringAsync(fileUri, csv, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  try {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        mimeType: "text/csv",
        dialogTitle: "Export Laporan Keuangan",
      });
    } else {
      await Share.share({
        url: fileUri,
        message: "Laporan keuangan dalam format CSV",
      });
    }
  } catch (e) {
    console.error("Error sharing CSV:", e);
    throw e;
  }

  return fileUri;
};
