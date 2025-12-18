import { View, Text, StyleSheet } from "react-native";
import BalanceCard from "../../components/BalanceCard";
import ChartView from "../../components/ChartView";
import { LightColors } from "../../constants/Colors";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <BalanceCard />
      <ChartView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: LightColors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: LightColors.primary,
  },
});
