export const initialInventoryState = {
    inventory: [],
    department: "",
    isLowStockItems: false,
    sortType: "name",
}

export const inventoryReducer = (state, {type, payload}) => {
    switch(type) {
        case "SET_INVENTORY": return {...state, inventory: payload}
        case "SET_DEPARTMENT_FILTER": return {...state, department: payload}
        case "SET_IS_LOW_STOCK_ITEMS_FILTER": return {...state, isLowStockItems: payload}
        case "SET_SORT_TYPE": return {...state, sortType: payload}
        case "ADD_PRODUCT": return {...state, inventory: [...state.inventory, payload]}
        default: return state
    }
}