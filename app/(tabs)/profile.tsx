import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { LightColors } from "../../constants/Colors";

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: LightColors.background },
  title: { fontWeight: "bold", marginBottom: 20, color: LightColors.primary, textAlign: "center" },
  logout: { backgroundColor: LightColors.expense, padding: 14, borderRadius: 12 },
  logoutText: { color: "#fff", fontWeight: "bold" },
});

export default function Profile() {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { paddingHorizontal: width * 0.07 }]}> 
      <Text style={[styles.title, { fontSize: width * 0.07 }]}>Profile</Text>

      <TouchableOpacity
        style={styles.logout}
        onPress={() => router.replace("../(auth)/login")}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
