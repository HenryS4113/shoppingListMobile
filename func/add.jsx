import AsyncStorage from "@react-native-async-storage/async-storage";

export const addItem = async (item) => {
  const itemObject = {
    id: Date.now().toString(),
    content: item.newItem,
    important: item.important,
    quantity: item.itemQuantity,
    purchased: item.itemPurchased,
    dateAdded: new Date().toISOString(),
  };

  const updatedItems = [...item.items, itemObject];
  item.setItems(updatedItems);

  try {
    await AsyncStorage.setItem("@shopping_list", JSON.stringify(updatedItems));
  } catch (e) {
    console.error("Error saving item", e);
  }

  item.setNewItem("");
  item.setImportant(1);
  item.setQuantity("");
  item.setPurchased(false);
};
