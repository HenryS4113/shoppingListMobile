export const sortOrder = (items, orderBy) => {
  return [...items].sort((a, b) => {
    switch (orderBy) {
      case "name":
        return a.content.localeCompare(b.content);
      case "priorityLow":
        return a.important - b.important;
      case "priorityHigh":
        return b.important - a.important;
      case "purchased":
        return b.purchased - a.purchased;
      case "date":
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      default:
        return 0;
    }
  });
};
