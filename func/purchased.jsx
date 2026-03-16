import AsyncStorage from "@react-native-async-storage/async-storage";

export const togglePurchased = async (id, currentValue) => {
  const updatedItems = currentValue.items.map((item) =>
    item.id === id ? { ...item, purchased: !item.purchased } : item,
  );

  currentValue.setItems(updatedItems);

  try {
    await AsyncStorage.setItem("@shopping_list", JSON.stringify(updatedItems));
  } catch (e) {
    console.error("Error updating purchased status", e);
  }
};
