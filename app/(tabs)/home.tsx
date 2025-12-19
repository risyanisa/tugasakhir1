import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import AddTransaction from "../../components/AddTransaction";
import BalanceCard from "../../components/BalanceCard";
import CalendarSummary from "../../components/CalendarSummary";
import MonthlyRecap from "../../components/MonthlyRecap";
import { LightColors } from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightColors.background,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 12,
    color: LightColors.primary,
    textAlign: "center",
  },
});


export default function Home() {
  const { width } = useWindowDimensions();
  const [showAdd, setShowAdd] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState(0);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LightColors.background }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: width * 0.07, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { fontSize: width * 0.07, marginTop: width * 0.04 }]}>Dashboard</Text>
        <Text style={{ textAlign: 'center', color: '#888', marginBottom: width * 0.04, fontSize: width * 0.045 }}>
          Selamat datang di halaman utama. Lihat ringkasan saldo dan grafik transaksi Anda di bawah ini.
        </Text>
        <BalanceCard key={`balance-${refreshKey}`} />
        <MonthlyRecap key={`recap-${refreshKey}`} />
        <CalendarSummary key={`calendar-${refreshKey}`} />
      </ScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 28,
          bottom: 32,
          backgroundColor: LightColors.primary,
          borderRadius: 32,
          width: 64,
          height: 64,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        }}
        onPress={() => setShowAdd(true)}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={36} color="#fff" />
      </TouchableOpacity>
      <Modal visible={showAdd} animationType="slide" onRequestClose={() => setShowAdd(false)}>
        <AddTransaction onClose={() => {
          setShowAdd(false);
          setRefreshKey(prev => prev + 1);
        }} />
      </Modal>
    </SafeAreaView>
  );
}
