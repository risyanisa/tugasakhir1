
export default function BalanceCard() {
  const [balance, setBalance] = useState(0);
  useFocusEffect(() => {
    getTotalBalance(setBalance);
  });

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Total Saldo</Text>
      <Text style={styles.amount}>Rp {balance.toLocaleString("id-ID")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: LightColors.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  amount: {
    fontSize: 26,
    fontWeight: "bold",
    color: LightColors.primary,
    marginTop: 8,
  },
});
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LightColors } from "../constants/Colors";
import { getTotalBalance } from "../services/transactionService";

