import { createContext, useEffect, useReducer } from "react";
import { inventoryData } from "../db/inventoryData";
import {
  initialInventoryState,
  inventoryReducer,
} from "../reducers/inventory-reducer";

export const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [inventoryState, inventoryDispatch] = useReducer(
    inventoryReducer,
    initialInventoryState
  );

  function getInventory() {
    const data = JSON.parse(localStorage.getItem("inventoryData"));
    if (data) {
      inventoryDispatch({ type: "SET_INVENTORY", payload: data });
    } else {
      localStorage.setItem("inventoryData", JSON.stringify(inventoryData));
      inventoryDispatch({ type: "SET_INVENTORY", payload: data });
    }
  }

  useEffect(() => {
    getInventory();
  }, []);

  const totalStock = inventoryState?.inventory?.reduce(
    (total, { stock }) => (total += stock),
    0
  );

  const totalDelivered = inventoryState?.inventory?.reduce(
    (total, { delivered }) => (total += delivered),
    0
  );

  const totalLowStockItems = inventoryState?.inventory?.reduce(
    (total, { stock }) => (stock <= 10 ? (total += 1) : total),
    0
  );

  const departments = [
    ...new Set(inventoryState?.inventory?.map(({ department }) => department)),
  ];

  const departementFilteredInventory =
    inventoryState?.department?.length && inventoryState?.department !== "All"
      ? inventoryState?.inventory?.filter(
          ({ department }) => department === inventoryState?.department
        )
      : inventoryState.inventory;

  const lowStockItemsFilteredInventory = inventoryState?.isLowStockItems
    ? departementFilteredInventory?.filter(({ stock }) => stock <= 10)
    : departementFilteredInventory;

  const sortFilteredInventory =
    inventoryState?.sortType === "name"
      ? [...lowStockItemsFilteredInventory].sort((a, b) =>
          {return a.name.localeCompare(b, "en", { sensitivity: "base" })}
        )
      : inventoryState?.sortType === "stock"
      ? [...lowStockItemsFilteredInventory].sort((a, b) => b.stock - a.stock)
      : inventoryState?.sortType === "price"
      ? [...lowStockItemsFilteredInventory].sort((a, b) => b.price - a.price)
      : lowStockItemsFilteredInventory;

  return (
    <InventoryContext.Provider
      value={{
        inventoryState,
        inventoryDispatch,
        totalStock,
        totalDelivered,
        totalLowStockItems,
        departments,
        sortFilteredInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}
