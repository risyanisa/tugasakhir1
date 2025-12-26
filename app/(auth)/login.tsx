import { router } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { LightColors } from "../../constants/Colors";
import { login } from "../../services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { width } = useWindowDimensions();

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) router.replace("../(tabs)/home");
    else alert("Login gagal");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.heroBubble} />
      <View style={styles.heroBubbleAccent} />

      <View style={[styles.container, { paddingHorizontal: width * 0.07 }]}>
        <Text style={[styles.brand, { fontSize: width * 0.065 }]}>Everflow</Text>
        <Text style={[styles.subtitle, { fontSize: width * 0.042 }]}>
          Kelola keuanganmu lebih rapi dan terukur.
        </Text>

        <View style={styles.card}>
          <Text style={[styles.title, { fontSize: width * 0.06 }]}>Masuk</Text>

          <TextInput
            placeholder="Username"
            style={[styles.input, { fontSize: width * 0.045 }]}
            onChangeText={setUsername}
            placeholderTextColor="#8c8c8c"
            selectionColor={LightColors.primary}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={[styles.input, { fontSize: width * 0.045 }]}
            onChangeText={setPassword}
            placeholderTextColor="#8c8c8c"
            selectionColor={LightColors.primary}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => router.push("../(auth)/register")}
          >
            <Text style={[styles.linkText, { fontSize: width * 0.04 }]}>Belum punya akun?</Text>
            <Text style={[styles.linkAction, { fontSize: width * 0.04 }]}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: LightColors.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 12,
  },
  heroBubble: {
    position: "absolute",
    top: -80,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: LightColors.primary,
    opacity: 0.15,
  },
  heroBubbleAccent: {
    position: "absolute",
    top: 120,
    left: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#9ad5ff",
    opacity: 0.12,
  },
  brand: {
    fontWeight: "900",
    color: LightColors.primary,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    textAlign: "center",
    color: "#5f6a7a",
    marginBottom: 6,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  title: {
    fontWeight: "800",
    color: "#1b2733",
    textAlign: "center",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f4f6fb",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e3e8ef",
    color: "#111",
  },
  button: {
    backgroundColor: LightColors.primary,
    padding: 14,
    borderRadius: 12,
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  linkRow: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  linkText: {
    color: "#5f6a7a",
  },
  linkAction: {
    color: LightColors.primary,
    fontWeight: "700",
  },
});
