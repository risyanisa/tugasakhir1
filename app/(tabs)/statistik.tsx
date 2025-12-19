import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { LightColors } from "../../constants/Colors";
import { getTransactions } from "../../services/transactionService";

const screenWidth = Dimensions.get("window").width;

export default function Statistik() {
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [chartData, setChartData] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchData = useCallback(() => {
    getTransactions((txs: any[]) => {
      if (!txs || !Array.isArray(txs)) return;

      const now = new Date();
      let startDate = new Date();
      let endDate = new Date();

      if (period === 'weekly') {
        const day = now.getDay(); 
        const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Senin sebagai awal minggu
        startDate = new Date(now);
        startDate.setDate(diff);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);
      } else if (period === 'monthly') {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      } else {
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      }

      const filtered = txs.filter(t => {
        // Fix: Replace space with T for Android date parsing compatibility
        const dateStr = t.date ? t.date.replace(' ', 'T') : '';
        const tDate = new Date(dateStr);
        if (isNaN(tDate.getTime())) return false;
        return t.type === type && tDate >= startDate && tDate <= endDate;
      });

      const grouped: Record<string, number> = {};
      let total = 0;
      filtered.forEach(t => {
        const amt = Number(t.amount) || 0;
        grouped[t.category] = (grouped[t.category] || 0) + amt;
        total += amt;
      });

      const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', 
        '#E7E9ED', '#76A346', '#D32F2F', '#1976D2'
      ];
      
      const data = Object.keys(grouped).map((key, index) => ({
        name: key,
        amount: grouped[key],
        color: colors[index % colors.length],
        legendFontColor: "#7F7F7F",
        legendFontSize: 12,
      }));

      setChartData(data);
      setTotalAmount(total);
    });
  }, [period, type]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Statistik</Text>
        
        <View style={styles.segmentContainer}>
          {(['weekly', 'monthly', 'yearly'] as const).map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.segmentButton, period === p && styles.activeSegment]}
              onPress={() => setPeriod(p)}
            >
              <Text style={[styles.segmentText, period === p && styles.activeSegmentText]}>
                {p === 'weekly' ? 'Mingguan' : p === 'monthly' ? 'Bulanan' : 'Tahunan'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.typeContainer}>
           <TouchableOpacity 
             style={[styles.typeButton, type === 'income' && styles.activeTypeIncome]}
             onPress={() => setType('income')}
           >
             <Text style={[styles.typeText, type === 'income' && styles.activeTypeText]}>Pemasukkan</Text>
           </TouchableOpacity>
           <TouchableOpacity 
             style={[styles.typeButton, type === 'expense' && styles.activeTypeExpense]}
             onPress={() => setType('expense')}
           >
             <Text style={[styles.typeText, type === 'expense' && styles.activeTypeText]}>Pengeluaran</Text>
           </TouchableOpacity>
        </View>

        {chartData.length > 0 ? (
          <>
          <PieChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            }}
            accessor={"amount"}
            backgroundColor={"transparent"}
            paddingLeft={(screenWidth / 4).toString()}
            absolute
            hasLegend={false}
          />
          <View style={styles.legendContainer}>
            {chartData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={styles.legendLeft}>
                  <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{item.name}</Text>
                </View>
                <Text style={styles.legendAmount}>
                  Rp {item.amount.toLocaleString('id-ID')}
                </Text>
              </View>
            ))}
          </View>
          </>
        ) : (
          <Text style={styles.noDataText}>Belum ada data untuk periode ini.</Text>
        )}

        <Text style={styles.totalText}>
          Total {type === 'income' ? 'Pemasukkan' : 'Pengeluaran'}: Rp {totalAmount.toLocaleString('id-ID')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightColors.background,
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: LightColors.primary,
  },
  segmentContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 4,
  },
  segmentButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  activeSegment: {
    backgroundColor: 'white',
  },
  segmentText: {
    color: '#555',
    fontWeight: '500',
  },
  activeSegmentText: {
    color: LightColors.primary,
    fontWeight: 'bold',
  },
  typeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeTypeIncome: {
    backgroundColor: LightColors.income,
    borderColor: LightColors.income,
  },
  activeTypeExpense: {
    backgroundColor: LightColors.expense,
    borderColor: LightColors.expense,
  },
  typeText: {
    color: "#555",
    fontWeight: '500',
  },
  activeTypeText: {
    color: 'white',
  },
  noDataText: {
    marginTop: 20,
    color: '#888',
    fontStyle: 'italic',
  },
  totalText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  legendContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  legendAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
