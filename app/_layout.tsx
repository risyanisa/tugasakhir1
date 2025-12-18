import { Stack } from "expo-router";
import { initDB } from "../services/database";
import { useEffect } from "react";

export default function Layout() {
  useEffect(() => {
    initDB();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
