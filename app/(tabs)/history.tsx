import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View, useWindowDimensions } from "react-native";
import TransactionItem from "../../components/TransactionItem";
import { LightColors } from "../../constants/Colors";
import { db } from "../../services/database";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LightColors.background },
});

export default function History() {
  const [data, setData] = useState<any[]>([]);
  const { width } = useWindowDimensions();
  useFocusEffect(() => {
    db.withExclusiveTransactionAsync(async (tx: any) => {
      const result = await tx.getAllAsync(
        "SELECT * FROM transactions ORDER BY date DESC",
        []
      );
      setData(result);
    });
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LightColors.background }}>
      <View style={[styles.container, { paddingHorizontal: width * 0.04 }]}> 
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TransactionItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
