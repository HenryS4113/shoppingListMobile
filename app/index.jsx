import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import testData from "@/(test)/testData";
import addItem from "@/func/add";
import styles from "@/func/styles";

export default function Index() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [itemQuantity, setQuantity] = useState("");
  const [important, setImportant] = useState(1);
  const [submissions, setSubmissions] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Determines label for each priority level
  const importanceLevel = [
    { value: 1, label: "Low", color: "#FACC15" },
    { value: 2, label: "Medium", color: "#FB923C" },
    { value: 3, label: "High", color: "#EF4444" },
  ];

  return (
    <SafeAreaView style={styles.background}>
      <FlatList
        data={testData}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>Shopping List</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.container}>
            <Text style={styles.footerTitle}>Add a new Item</Text>

            <View style={styles.formCard}>
              <TextInput
                style={styles.input}
                placeholder="New Item..."
                placeholderTextColor="#999"
                value={newItem}
                onChangeText={setNewItem}
              />

              <TextInput
                style={styles.input}
                placeholder="How many...?"
                placeholderTextColor="#999"
                value={itemQuantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Priority:</Text>
              <View style={styles.priorityRow}>
                {importanceLevel.map((level) => (
                  <Pressable
                    key={level.value}
                    onPress={() => setImportant(level.value)}
                    style={[
                      styles.priorityButton,
                      { backgroundColor: level.color },
                      important === level.value && styles.priorityActive,
                    ]}
                  >
                    <Text
                      style={
                        important === level.value
                          ? styles.activeText
                          : styles.inactiveText
                      }
                    >
                      {level.label}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Pressable
                style={styles.saveButton}
                onPress={() =>
                  addItem(
                    newItem,
                    itemQuantity,
                    important,
                    items,
                    setItems,
                    setNewItem,
                    setQuantity,
                  )
                }
              >
                <Text style={styles.saveButtonText}>Save New Item</Text>
              </Pressable>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.background}>
            <View style={styles.container}>
              <View style={styles.row}>
                <View style={styles.postContainer}>
                  <Text style={styles.itemName}>{item.content}</Text>
                  <Text style={styles.itemDesc}>{item.important}</Text>
                </View>
                <Pressable
                  style={styles.button}
                  onPress={() => setShowConfirmModal(true)}
                >
                  <Text>More Info</Text>
                </Pressable>
                <Modal
                  visible={showConfirmModal}
                  transparent
                  animationType="slide"
                  onRequestClose={() => setShowConfirmModal(false)}
                  accessible={true}
                  accessibilityViewIsModal={true}
                >
                  <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                      <Text
                        style={styles.modalTitle}
                        accessibilityRole="header"
                      >
                        More info
                      </Text>
                      <View accessible={true}>
                        <Text>Name: {item.content}</Text>
                        <Text>Urgency: {item.important}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                        <Text>Purchase status: {item.purchased}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.modalButtons}>
                    <Pressable
                      style={[styles.modalButton, { backgroundColor: "#777" }]}
                      onPress={() => setShowConfirmModal(false)}
                      accessibilityRole="button"
                      accessibilityLabel="Cancel and close modal"
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>

                    <Pressable
                      style={styles.modalButton}
                      onPress={() => setShowConfirmModal(false)}
                    >
                      <Text style={styles.buttonText}>Finished</Text>
                    </Pressable>
                  </View>
                </Modal>
              </View>
            </View>
          </View>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}
