import { useContext } from "react"
import "./home.css"
import { InventoryContext } from "../../context/inventory-context"

export function Home () {
    const {totalStock, totalDelivered, totalLowStockItems} = useContext(InventoryContext)

    return(
        <div className="home-container">
            <div className="inventory-level">
                <p className="total-stock">{totalStock}</p>
                <p>Total Stock</p>
            </div>
            <div className="inventory-level">
                <p className="total-delivered">{totalDelivered}</p>
                <p>Total Delivered</p>
            </div>
            <div className="inventory-level">
                <p className="low-stock-items">{totalLowStockItems}</p>
                <p>Low Stock Items</p>
            </div>
        </div>
    )
}