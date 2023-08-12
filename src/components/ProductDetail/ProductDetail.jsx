import { useContext } from "react"
import { useParams } from "react-router-dom"
import "./productDetail.css"
import { InventoryContext } from "../../context/inventory-context"

export function ProductDetails () {
    const {productId} = useParams()
    const {inventoryState: {inventory}} = useContext(InventoryContext)

    const product = inventory?.find(({id}) => id === Number(productId))
    const {
        department,
        name,
        description,
        price,
        stock,
        supplier,
        imageUrl,
        sku,
        delivered
      } = product

    return(
        <div className="product-detail-container">
            <h2>{name}</h2>
            <img src={imageUrl} alt={name} />
            <p>Price: ${price}</p>
            <p>Stock: {stock}</p>
            <p>Supplier: {supplier}</p>
            <p>Department: {department}</p>
            <p>SKU: {sku}</p>
            <p>Delivered: {delivered}</p>
            <p>Description: {description}</p>
        </div>
    )
}