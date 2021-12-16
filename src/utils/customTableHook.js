import { useState, useMemo } from "react";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const searchTableContent = (tableContent, searchedText) => {
  return tableContent.filter(
    (tableRowContent) =>
      tableRowContent.first_name.toLowerCase().search(searchedText) !== -1 ||
      tableRowContent.last_name.toLowerCase().search(searchedText) !== -1 ||
      tableRowContent.email.toLowerCase().search(searchedText) !== -1
  );
};

const filterTableContent = (tableContent, selectedValue, key) => {
  if (key === "age") {
    switch (selectedValue) {
      case "below 30":
        return tableContent.filter(
          (tableRowContent) => tableRowContent[key] <= 30
        );
      case "above 31":
        return tableContent.filter(
          (tableRowContent) =>
            tableRowContent[key] > 30 && tableRowContent[key] < 45
        );
      case "above 45":
        return tableContent.filter(
          (tableRowContent) => tableRowContent[key] >= 45
        );
      default:
        return tableContent;
    }
  }
  return selectedValue
    ? tableContent.filter(
        (tableRowContent) =>
          tableRowContent[key].toLowerCase() === selectedValue
      )
    : tableContent;
};

const deleteRow = (tableContent, key, id) => {
  debugger;
  return tableContent.filter((tableRowContent) => tableRowContent[key] !== id);
};

export { useSortableData, searchTableContent, deleteRow, filterTableContent };
