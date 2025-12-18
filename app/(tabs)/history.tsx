import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import TransactionItem from "../../components/TransactionItem";
import { LightColors } from "../../constants/Colors";
import { db } from "../../services/database";

export default function History() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    db.withExclusiveTransactionAsync(async (tx: any) => {
      const result = await tx.getAllAsync(
        "SELECT * FROM transactions ORDER BY date DESC",
        []
      );
      setData(result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TransactionItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: LightColors.background },
});
