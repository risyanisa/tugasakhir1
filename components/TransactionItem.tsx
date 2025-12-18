import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { deleteTransaction } from "../services/transactionService";
import { Transaction } from "../types";
import { LightColors } from "../constants/Colors";

export default function TransactionItem({ item }: { item: Transaction }) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.note}>{item.note}</Text>
      </View>

      <View style={styles.right}>
        <Text
          style={[
            styles.amount,
            { color: item.type === "income" ? LightColors.income : LightColors.expense },
          ]}
        >
          {item.type === "income" ? "+" : "-"} Rp {item.amount.toLocaleString("id-ID")}
        </Text>
        <TouchableOpacity onPress={() => deleteTransaction(item.id)}>
          <Text style={styles.delete}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category: {
    fontWeight: "bold",
  },
  note: {
    fontSize: 12,
    color: "#666",
  },
  right: {
    alignItems: "flex-end",
  },
  amount: {
    fontWeight: "bold",
  },
  delete: {
    fontSize: 12,
    color: LightColors.expense,
    marginTop: 4,
  },
});
