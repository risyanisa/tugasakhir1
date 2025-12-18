import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { login } from "../../services/authService";
import { router } from "expo-router";
import { LightColors } from "../../constants/Colors";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) router.replace("../(tabs)/home");
    else alert("Login gagal");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Money Manager</Text>
      <TextInput placeholder="Username" style={styles.input} onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text onPress={() => router.push("../(auth)/register")}>Register</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: LightColors.background },
  title: { fontSize: 28, fontWeight: "bold", color: LightColors.primary, marginBottom: 20 },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 12 },
  button: { backgroundColor: LightColors.primary, padding: 14, borderRadius: 12 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
