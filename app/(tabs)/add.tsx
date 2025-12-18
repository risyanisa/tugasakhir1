import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LightColors } from "../../constants/Colors";
import { db } from "../../services/database";

export default function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const saveTransaction = async () => {
    await db.withExclusiveTransactionAsync(async (tx: any) => {
      await tx.runAsync(
        "INSERT INTO transactions (type, amount, category, note, date) VALUES (?,?,?,?,?)",
        [type, Number(amount), category, note, new Date().toISOString()]
      );
    });
    alert("Transaksi berhasil disimpan");
    setAmount("");
    setCategory("");
    setNote("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Transaksi</Text>

      <View style={styles.switch}>
        <Text onPress={() => setType("income")} style={type === "income" ? styles.active : styles.inactive}>Income</Text>
        <Text onPress={() => setType("expense")} style={type === "expense" ? styles.active : styles.inactive}>Expense</Text>
      </View>

      <TextInput
        placeholder="Jumlah"
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        placeholder="Kategori"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        placeholder="Catatan"
        style={styles.input}
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.button} onPress={saveTransaction}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: LightColors.background },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12, color: LightColors.primary },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10 },
  button: { backgroundColor: LightColors.primary, padding: 14, borderRadius: 12 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  switch: { flexDirection: "row", justifyContent: "space-around", marginBottom: 12 },
  active: { fontWeight: "bold", color: LightColors.primary },
  inactive: { color: "#aaa" },
});
