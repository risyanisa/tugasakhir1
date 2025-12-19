import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LightColors } from "../constants/Colors";

interface TransactionItemProps {
  item: any;
  onDelete: () => void;
}

export default function TransactionItem({ item, onDelete }: TransactionItemProps) {
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
        <TouchableOpacity onPress={onDelete}>
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
