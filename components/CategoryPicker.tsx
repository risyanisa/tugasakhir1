import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { categories } from "../constants/Categories";
import { LightColors } from "../constants/Colors";

interface Props {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryPicker({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.item,
            selected === cat && styles.active,
          ]}
          onPress={() => onSelect(cat)}
        >
          <Text style={styles.text}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  item: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    margin: 4,
  },
  active: {
    backgroundColor: LightColors.primary,
  },
  text: {
    fontSize: 12,
    color: "#333",
  },
});
