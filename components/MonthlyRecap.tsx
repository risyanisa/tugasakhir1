import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LightColors } from "../constants/Colors";
import { getMonthlySummary } from "../services/transactionService";

function getMonthName(month: number) {
  return new Date(2025, month - 1, 1).toLocaleString("id-ID", { month: "long" });
}

export default function MonthlyRecap() {
  const [data, setData] = useState<{month: number, year: number, income: number, expense: number}[]>([]);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    Promise.all(
      months.map(async (m) => {
        let income = 0, expense = 0;
        await getMonthlySummary(year, m, (v) => income = v, (v) => expense = v);
        return { month: m, year, income, expense };
      })
    ).then(setData);
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Rekap Pemasukkan & Pengeluaran per Bulan</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {data.map((item) => (
            <View key={item.month} style={styles.monthBox}>
              <Text style={styles.month}>{getMonthName(item.month)}</Text>
              <Text style={styles.income}>+ Rp {item.income.toLocaleString('id-ID')}</Text>
              <Text style={styles.expense}>- Rp {item.expense.toLocaleString('id-ID')}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
    color: LightColors.primary,
    textAlign: 'center',
  },
  monthBox: {
    backgroundColor: LightColors.card,
    borderRadius: 12,
    padding: 14,
    minWidth: 120,
    alignItems: 'center',
    marginRight: 8,
  },
  month: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: LightColors.primary,
  },
  income: {
    color: LightColors.income,
    fontWeight: 'bold',
    fontSize: 14,
  },
  expense: {
    color: LightColors.expense,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
