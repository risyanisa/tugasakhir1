

import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LightColors } from "../constants/Colors";
import { getDailySummary, getMonthlySummary, getSummary } from "../services/transactionService";

export default function ChartView() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [dailyIncome, setDailyIncome] = useState(0);
  const [dailyExpense, setDailyExpense] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [show, setShow] = useState<'total'|'daily'|'monthly'>('total');

  const [today] = useState(new Date());
  useFocusEffect(() => {
    getSummary(setIncome, setExpense);
    const todayStr = today.toISOString().slice(0, 10);
    getDailySummary(todayStr, setDailyIncome, setDailyExpense);
    getMonthlySummary(today.getFullYear(), today.getMonth() + 1, setMonthlyIncome, setMonthlyExpense);
  });

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={styles.title}>Ringkasan</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity onPress={() => setShow('total')}><Text style={[styles.switch, show==='total'&&styles.activeSwitch]}>Total</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setShow('daily')}><Text style={[styles.switch, show==='daily'&&styles.activeSwitch]}>Harian</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setShow('monthly')}><Text style={[styles.switch, show==='monthly'&&styles.activeSwitch]}>Bulanan</Text></TouchableOpacity>
        </View>
      </View>
      {show === 'total' && (
        <>
          <Text style={styles.income}>Pemasukan : Rp {income.toLocaleString("id-ID")}</Text>
          <Text style={styles.expense}>Pengeluaran : Rp {expense.toLocaleString("id-ID")}</Text>
        </>
      )}
      {show === 'daily' && (
        <>
          <Text style={{fontSize:13, color:'#888', marginBottom:2}}>
            Tanggal: {today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </Text>
          <Text style={styles.income}>Pemasukan Hari Ini : Rp {dailyIncome.toLocaleString("id-ID")}</Text>
          <Text style={styles.expense}>Pengeluaran Hari Ini : Rp {dailyExpense.toLocaleString("id-ID")}</Text>
        </>
      )}
      {show === 'monthly' && (
        <>
          <Text style={{fontSize:13, color:'#888', marginBottom:2}}>
            Bulan: {today.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
          </Text>
          <Text style={styles.income}>Pemasukan Bulan Ini : Rp {monthlyIncome.toLocaleString("id-ID")}</Text>
          <Text style={styles.expense}>Pengeluaran Bulan Ini : Rp {monthlyExpense.toLocaleString("id-ID")}</Text>
        </>
      )}
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
    marginBottom: 2,
  },
  expense: {
    color: LightColors.expense,
    marginBottom: 2,
  },
  switch: {
    color: '#888',
    marginHorizontal: 4,
    fontSize: 13,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  activeSwitch: {
    color: LightColors.primary,
    backgroundColor: LightColors.card,
    fontWeight: 'bold',
  },
});

