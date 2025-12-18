import { db } from "./database";

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

export const deleteTransaction = async (id: number) => {
  await db.withExclusiveTransactionAsync(async (tx: any) => {
    await tx.runAsync("DELETE FROM transactions WHERE id=?", [id]);
  });
};
