import React from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { expenseCategories, incomeCategories } from "../constants/Categories";
import { LightColors } from "../constants/Colors";

interface Props {
  selected: string;
  onSelect: (category: string) => void;
  type: 'income' | 'expense';
}

export default function CategoryPicker(props: Props) {
  const { selected, onSelect, type } = props;
  // Simpan custom kategori terpisah untuk income dan expense
  const [customIncome, setCustomIncome] = React.useState<string[]>([]);
  const [customExpense, setCustomExpense] = React.useState<string[]>([]);
  const [adding, setAdding] = React.useState(false);
  const [newCat, setNewCat] = React.useState('');
  const [editIdx, setEditIdx] = React.useState<number|null>(null);
  const [editCat, setEditCat] = React.useState('');

  const baseList = type === 'income' ? incomeCategories : expenseCategories;
  const customCategories = type === 'income' ? customIncome : customExpense;
  const setCustomCategories = type === 'income' ? setCustomIncome : setCustomExpense;
  const list = [...baseList, ...customCategories];

  const handleAdd = () => {
    const val = newCat.trim();
    if (val && !list.includes(val)) {
      setCustomCategories([...customCategories, val]);
      onSelect(val);
    }
    setNewCat('');
    setAdding(false);
  };

  const handleEdit = (idx: number) => {
    if (editCat.trim() && !list.includes(editCat.trim())) {
      const updated = [...customCategories];
      updated[idx] = editCat.trim();
      setCustomCategories(updated);
      onSelect(editCat.trim());
      setEditIdx(null);
      setEditCat('');
    }
  };

  const handleDelete = (idx: number) => {
    const updated = [...customCategories];
    const deleted = updated.splice(idx, 1);
    setCustomCategories(updated);
    if (selected === deleted[0]) onSelect('');
    setEditIdx(null);
    setEditCat('');
  };

  return (
    <View style={styles.container}>
      {baseList.map((cat) => (
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
      {customCategories.map((cat, idx) => (
        editIdx === idx ? (
          <View key={cat} style={[styles.item, { flexDirection: 'row', alignItems: 'center', gap: 4 }]}> 
            <TextInput
              value={editCat}
              onChangeText={setEditCat}
              placeholder="Edit kategori"
              style={{ fontSize: 12, flex: 1, padding: 0, margin: 0 }}
              onSubmitEditing={() => handleEdit(idx)}
              autoFocus
            />
            <TouchableOpacity onPress={() => handleEdit(idx)}><Text style={{ color: '#2196f3', fontWeight: 'bold' }}>OK</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(idx)}><Text style={{ color: '#f44336', fontWeight: 'bold' }}>Hapus</Text></TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            key={cat}
            style={[
              styles.item,
              selected === cat && styles.active,
            ]}
            onPress={() => onSelect(cat)}
            onLongPress={() => { setEditIdx(idx); setEditCat(cat); }}
          >
            <Text style={styles.text}>{cat}</Text>
          </TouchableOpacity>
        )
      ))}
      <TouchableOpacity style={[styles.item, { borderStyle: 'dashed', borderWidth: 1, borderColor: '#bbb' }]} onPress={() => setAdding(true)}>
        <Text style={[styles.text, { color: '#888' }]}>+ Tambah Kategori</Text>
      </TouchableOpacity>
      <Modal
        visible={adding}
        transparent
        animationType="fade"
        onRequestClose={() => { setAdding(false); setNewCat(''); }}
      >
        <Pressable style={styles.modalOverlay} onPress={() => { setAdding(false); setNewCat(''); }}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Tambah Kategori Baru</Text>
            <TextInput
              value={newCat}
              onChangeText={text => setNewCat(text)}
              placeholder="Nama kategori"
              style={{ fontSize: 15, backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 12, borderWidth: 1, borderColor: '#eee' }}
              autoFocus
              onSubmitEditing={handleAdd}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
              <TouchableOpacity onPress={() => { setAdding(false); setNewCat(''); }}>
                <Text style={{ color: '#888', fontWeight: 'bold', fontSize: 15 }}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAdd}>
                <Text style={{ color: '#2196f3', fontWeight: 'bold', fontSize: 15 }}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 14,
      padding: 20,
      minWidth: 260,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
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
