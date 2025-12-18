import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { LightColors } from "../../constants/Colors";
import { register } from "../../services/authService";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: LightColors.background,
  },
  title: {
    fontWeight: "bold",
    color: LightColors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: LightColors.primary,
    padding: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { width } = useWindowDimensions();

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Semua field wajib diisi");
      return;
    }
    await register(username, password);
    alert("Registrasi berhasil");
    router.replace("../(auth)/login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LightColors.background }}>
      <View style={[styles.container, { paddingHorizontal: width * 0.07 }]}> 
        <Text style={[styles.title, { fontSize: width * 0.08 }]}>Register</Text>
        <TextInput
          placeholder="Username"
          style={[styles.input, { fontSize: width * 0.045 }]}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={[styles.input, { fontSize: width * 0.045 }]}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
