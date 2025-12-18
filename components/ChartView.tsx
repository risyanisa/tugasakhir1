import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getSummary } from "../services/transactionService";
import { LightColors } from "../constants/Colors";

export default function ChartView() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    getSummary(setIncome, setExpense);
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ringkasan</Text>
      <Text style={styles.income}>Pemasukan : Rp {income.toLocaleString("id-ID")}</Text>
      <Text style={styles.expense}>Pengeluaran : Rp {expense.toLocaleString("id-ID")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  income: {
    color: LightColors.income,
  },
  expense: {
    color: LightColors.expense,
  },
});
