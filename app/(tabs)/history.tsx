import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View, useWindowDimensions } from "react-native";
import TransactionItem from "../../components/TransactionItem";
import { LightColors } from "../../constants/Colors";
import { deleteTransaction, getTransactions } from "../../services/transactionService";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LightColors.background },
});

export default function History() {
  const [data, setData] = useState<any[]>([]);
  const { width } = useWindowDimensions();

  const fetchData = useCallback(() => {
    getTransactions(setData);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const handleDelete = (id: number) => {
    deleteTransaction(id, () => fetchData());
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LightColors.background }}>
      <View style={[styles.container, { paddingHorizontal: width * 0.04 }]}> 
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TransactionItem item={item} onDelete={() => handleDelete(item.id)} />}
        />
      </View>
    </SafeAreaView>
  );
}
