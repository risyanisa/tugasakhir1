import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { LightColors } from "../../constants/Colors";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity
        style={styles.logout}
        onPress={() => router.replace("../(auth)/login")}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: LightColors.background },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: LightColors.primary },
  logout: { backgroundColor: LightColors.expense, padding: 14, borderRadius: 12 },
  logoutText: { color: "#fff", fontWeight: "bold" },
});
