import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteItem = async (id, current) => {
  const updatedItems = current.items.filter((item) => item.id !== id);
  current.setItems(updatedItems);

  try {
    await AsyncStorage.setItem("@shopping_list", JSON.stringify(updatedItems));
  } catch (e) {
    console.error("Error deleting item ", e);
  }
};
