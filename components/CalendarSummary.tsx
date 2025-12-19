import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { LightColors } from "../constants/Colors";
import { getDailySummary } from "../services/transactionService";

LocaleConfig.locales['id'] = {
  monthNames: [
    'Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'
  ],
  monthNamesShort: [
    'Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'
  ],
  dayNames: [
    'Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'
  ],
  dayNamesShort: [
    'Min','Sen','Sel','Rab','Kam','Jum','Sab'
  ],
  today: 'Hari ini'
};
LocaleConfig.defaultLocale = 'id';

export default function CalendarSummary() {
  const [selected, setSelected] = useState(new Date().toISOString().slice(0,10));
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useFocusEffect(() => {
    getDailySummary(selected, setIncome, setExpense);
  });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Kalender Transaksi</Text>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
          getDailySummary(day.dateString, setIncome, setExpense);
        }}
        markedDates={{
          [selected]: {selected: true, selectedColor: LightColors.primary}
        }}
        theme={{
          todayTextColor: LightColors.primary,
          selectedDayBackgroundColor: LightColors.primary,
          arrowColor: LightColors.primary,
        }}
      />
      <View style={{marginTop: 16}}>
        <Text style={styles.income}>Pemasukan: Rp {income.toLocaleString('id-ID')}</Text>
        <Text style={styles.expense}>Pengeluaran: Rp {expense.toLocaleString('id-ID')}</Text>
      </View>
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
    fontSize: 18,
    color: LightColors.primary,
    textAlign: 'center',
  },
  income: {
    color: LightColors.income,
    marginBottom: 2,
    fontWeight: 'bold',
    fontSize: 16,
  },
  expense: {
    color: LightColors.expense,
    marginBottom: 2,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
