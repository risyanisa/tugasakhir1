import { useColorScheme } from "react-native";
import { LightColors, DarkColors } from "../constants/Colors";

export default function useTheme() {
  const scheme = useColorScheme();
  return scheme === "dark" ? DarkColors : LightColors;
}
