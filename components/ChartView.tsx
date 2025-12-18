
export default function ChartView() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  useFocusEffect(() => {
    getSummary(setIncome, setExpense);
  });

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
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LightColors } from "../constants/Colors";
import { getSummary } from "../services/transactionService";

