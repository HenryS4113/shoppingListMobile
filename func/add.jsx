export const addItem = (item) => {
  const itemObject = {
    id: Date.now().toString(),
    content: item.newItem,
    important: item.important,
    quantity: item.itemQuantity,
    purchased: item.itemPurchased,
    dateAdded: new Date().toISOString(),
  };

  item.setItems((prevItems) => [...prevItems, itemObject]);

  item.setNewItem("");
  item.setImportant(1);
  item.setQuantity("");
  item.setPurchased(false);
};
