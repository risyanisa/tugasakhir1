import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LightColors } from "../../constants/Colors";
import { getUserProfile } from "../../services/transactionService";

export default function Profile() {
  const [user, setUser] = useState({ name: "User Pengguna", email: "user@financial.app" });
  const [modalVisible, setModalVisible] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  
  useFocusEffect(
    useCallback(() => {
      getUserProfile((userData) => {
        if (userData) setUser(userData);
      });
    }, [])
  );

  const handleLogout = () => {
    Alert.alert("Konfirmasi", "Apakah Anda yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      { text: "Keluar", style: "destructive", onPress: () => console.log("Logout") },
    ]);
  };

  const handleEditProfile = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setModalVisible(true);
  };

  const handleSaveProfile = () => {
    setUser({ ...user, name: editName, email: editEmail });
    setModalVisible(false);
    Alert.alert("Berhasil", "Profil berhasil diperbarui.");
  };

  const menuItems = [
    {
      title: "Pengaturan Akun",
      items: [
        { icon: "person-outline", label: "Edit Profil", action: handleEditProfile },
        { icon: "lock-closed-outline", label: "Keamanan & PIN", action: () => console.log("Keamanan") },
      ],
    },
    {
      title: "Preferensi",
      items: [
        { icon: "notifications-outline", label: "Notifikasi Pengingat", action: () => console.log("Notifikasi") },
        { icon: "color-palette-outline", label: "Tampilan Aplikasi", action: () => console.log("Tampilan") },
      ],
    },
    {
      title: "Data Keuangan",
      items: [
        { icon: "document-text-outline", label: "Export Laporan (PDF/Excel)", action: () => console.log("Export") },
        { icon: "trash-bin-outline", label: "Reset Semua Data", action: () => Alert.alert("Hapus Data", "Semua data transaksi akan dihapus permanen.") },
      ],
    },
    {
      title: "Lainnya",
      items: [
        { icon: "help-circle-outline", label: "Pusat Bantuan", action: () => console.log("Help") },
        { icon: "information-circle-outline", label: "Tentang Aplikasi", action: () => console.log("About") },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Profil */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color="white" />
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        {/* Menu Items */}
        {menuItems.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, idx) => (
                <TouchableOpacity 
                  key={idx} 
                  style={[styles.menuItem, idx === section.items.length - 1 && styles.lastMenuItem]} 
                  onPress={item.action}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons name={item.icon as any} size={20} color={LightColors.primary} />
                    </View>
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#ccc" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Tombol Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Versi Aplikasi 1.0.0</Text>
      </ScrollView>

      {/* Modal Edit Profil */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profil</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nama Lengkap</Text>
              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder="Masukkan nama lengkap"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="Masukkan email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
              <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: LightColors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff4d4d",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  version: {
    textAlign: "center",
    color: "#aaa",
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  saveButton: {
    backgroundColor: LightColors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: LightColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
