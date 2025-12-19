import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { LightColors } from "../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: LightColors.primary,
        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistik"
        options={{
          title: "Statistik",
          tabBarIcon: ({ color }) => (
            <Ionicons name="pie-chart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <Ionicons name="time" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
