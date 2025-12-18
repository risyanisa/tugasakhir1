import { db } from "./database";

export const register = (username: string, password: string) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.withExclusiveTransactionAsync(async (tx: any) => {
        await tx.runAsync(
          "INSERT INTO users (username, password) VALUES (?,?)",
          [username, password]
        );
      });
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });

export const login = (username: string, password: string) =>
  new Promise<boolean>(async (resolve, reject) => {
    try {
      await db.withExclusiveTransactionAsync(async (tx: any) => {
        const rows = await tx.getAllAsync(
          "SELECT * FROM users WHERE username=? AND password=?",
          [username, password]
        );
        console.log('Login query result:', rows);
        resolve(rows.length > 0);
      });
    } catch (err) {
      reject(err);
    }
  });
