import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { LightColors } from "../constants/Colors";
import { db } from "../services/database";
import CategoryPicker from "./CategoryPicker";

export default function AddTransaction({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const { width } = useWindowDimensions();

  const saveTransaction = async () => {
    await db.withExclusiveTransactionAsync(async (tx: any) => {
      await tx.runAsync(
        "INSERT INTO transactions (type, amount, category, note, date) VALUES (?,?,?,?,?)",
        [type, Number(amount), category, note, new Date().toISOString()]
      );
    });
    setAmount("");
    setCategory("");
    setNote("");
    onClose();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LightColors.background }}>
      <View style={[styles.container, { paddingHorizontal: width * 0.07 }]}> 
        <Text style={[styles.title, { fontSize: width * 0.07 }]}>Tambah Transaksi</Text>
        <View style={[styles.switch, { marginBottom: width * 0.04 }]}> 
          <Text onPress={() => setType("income")} style={type === "income" ? styles.active : styles.inactive}>Pemasukkan</Text>
          <Text onPress={() => setType("expense")} style={type === "expense" ? styles.active : styles.inactive}>Pengeluaran</Text>
        </View>
        <TextInput
          placeholder="Jumlah"
          keyboardType="numeric"
          style={[styles.input, { fontSize: width * 0.045 }]}
          value={amount}
          onChangeText={setAmount}
        />
        <CategoryPicker selected={category} onSelect={setCategory} type={type} />
        <TextInput
          placeholder="Catatan"
          style={[styles.input, { fontSize: width * 0.045 }]}
          value={note}
          onChangeText={setNote}
        />
        <TouchableOpacity style={styles.button} onPress={saveTransaction}>
          <Text style={styles.buttonText}>Simpan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: LightColors.expense, marginTop: 8 }]} onPress={onClose}>
          <Text style={styles.buttonText}>Batal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LightColors.background },
  title: { fontWeight: "bold", marginBottom: 12, color: LightColors.primary, textAlign: "center" },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10 },
  button: { backgroundColor: LightColors.primary, padding: 14, borderRadius: 12 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  switch: { flexDirection: "row", justifyContent: "space-around" },
  active: { fontWeight: "bold", color: LightColors.primary },
  inactive: { color: "#aaa" },
});
