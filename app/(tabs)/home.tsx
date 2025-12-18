import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import BalanceCard from "../../components/BalanceCard";
import ChartView from "../../components/ChartView";
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LightColors.background }}>
      <View style={[styles.container, { paddingHorizontal: width * 0.07 }]}> 
        <Text style={[styles.title, { fontSize: width * 0.07, marginTop: width * 0.04 }]}>Dashboard</Text>
        <Text style={{ textAlign: 'center', color: '#888', marginBottom: width * 0.04, fontSize: width * 0.045 }}>
          Selamat datang di halaman utama. Lihat ringkasan saldo dan grafik transaksi Anda di bawah ini.
        </Text>
        <BalanceCard />
        <ChartView />
      </View>
    </SafeAreaView>
  );
}
