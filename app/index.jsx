import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { addItem } from "@/func/add";
import { deleteItem } from "@/func/delete";
import { togglePurchased } from "@/func/purchased";
import { sortOrder } from "@/func/sorting";
import styles from "@/func/styles";

export default function Index() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [itemQuantity, setQuantity] = useState("");
  const [important, setImportant] = useState(1);
  const [itemPurchased, setPurchased] = useState(false);
  const [current, setCurrentItem] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [orderBy, setOrderBy] = useState("name");

  // Determines label for each priority level
  const importanceLevel = [
    { value: 1, label: "Low", color: "#FACC15" },
    { value: 2, label: "Medium", color: "#FB923C" },
    { value: 3, label: "High", color: "#EF4444" },
  ];

  useEffect(() => {
    const loadItems = async () => {
      const savedItems = await AsyncStorage.getItem("@shopping_list");
      if (savedItems) setItems(JSON.parse(savedItems));
    };
    loadItems();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <FlatList
          data={sortOrder(items, orderBy)}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerText}>Shopping List</Text>
            </View>
          }
          ListFooterComponent={
            <View style={styles.container}>
              <View style={styles.container}>
                <Text style={styles.modalTitle}>Order By:</Text>
                <Picker
                  selectedValue={orderBy}
                  onValueChange={(itemValue) => setOrderBy(itemValue)}
                  style={styles.input}
                  mode="dropdown"
                >
                  <Picker.Item label="Name" value="name" />
                  <Picker.Item label="Priority (Low)" value="priorityLow" />
                  <Picker.Item label="Priority (High)" value="priorityHigh" />
                  <Picker.Item label="Purchased" value="purchased" />
                  <Picker.Item label="Date Added" value="date" />
                </Picker>
              </View>
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
                        important === level.value &&
                          styles.priorityButtonPressed,
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
                    addItem({
                      newItem,
                      itemQuantity,
                      important,
                      items,
                      setItems,
                      setNewItem,
                      setQuantity,
                      setPurchased,
                      setImportant,
                    })
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
                    <Text
                      style={[
                        styles.outline,
                        {
                          color:
                            importanceLevel.find(
                              (i) => i.value === item.important,
                            )?.color || "black",
                        },
                      ]}
                    >
                      {" "}
                      {
                        importanceLevel.find((l) => l.value === item.important)
                          ?.label
                      }
                    </Text>
                  </View>
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      setCurrentItem(item);
                      setShowConfirmModal(true);
                    }}
                  >
                    <Text>More Info</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        ></FlatList>
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
              {current && (
                <>
                  <Text style={styles.modalTitle} accessibilityRole="header">
                    More info
                  </Text>
                  <View accessible={true}>
                    <Text>Item: {current.content}</Text>
                    <Text>
                      Urgency:{" "}
                      <Text
                        style={[
                          styles.itemDesc,
                          {
                            color:
                              importanceLevel.find(
                                (l) => l.value === current.important,
                              )?.color || "white",
                          },
                        ]}
                      >
                        {
                          importanceLevel.find(
                            (l) => l.value === current.important,
                          )?.label
                        }
                      </Text>
                    </Text>
                    <Text>Quantity: {current.quantity}</Text>

                    <Pressable
                      style={[
                        styles.modalButton,
                        {
                          backgroundColor: current.purchased
                            ? "#16a34a"
                            : "#999",
                          marginTop: 10,
                        },
                      ]}
                      onPress={async () => {
                        await togglePurchased(current.id, { items, setItems });
                        setCurrentItem({
                          ...current,
                          purchased: !current.purchased,
                        });
                      }}
                    >
                      <Text style={styles.buttonText}>
                        {current.purchased ? "Purchased" : "Mark as Purchased"}
                      </Text>
                    </Pressable>

                    <Pressable
                      style={[
                        styles.modalButton,
                        { backgroundColor: "#ef4444", marginTop: 20 },
                      ]}
                      onPress={async () => {
                        await deleteItem(current.id, { items, setItems });
                        setShowConfirmModal(false);
                      }}
                    >
                      <Text style={styles.buttonText}>Delete Item</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </View>
            <View style={styles.modalButtons}>
              <Pressable
                style={[
                  styles.saveButton,
                  { backgroundColor: "#818683", borderWidth: 1 },
                ]}
                onPress={() => setShowConfirmModal(false)}
                accessibilityRole="button"
                accessibilityLabel="Cancel and close modal"
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.saveButton, { borderWidth: 1 }]}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={styles.buttonText}>Finished</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
