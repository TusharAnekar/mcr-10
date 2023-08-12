import { useContext } from "react";
import "./products.css";
import { InventoryContext } from "../../context/inventory-context";
import { NavLink, useNavigate } from "react-router-dom";

export function Products() {
    const navigate = useNavigate()

  const {
    inventoryState: { department, isLowStockItems, sortType },
    inventoryDispatch,
    departments,
    sortFilteredInventory,
  } = useContext(InventoryContext);

  function handleDepartments(e) {
    inventoryDispatch({
      type: "SET_DEPARTMENT_FILTER",
      payload: e.target.value,
    });
  }

  function handleInput() {
    inventoryDispatch({
      type: "SET_IS_LOW_STOCK_ITEMS_FILTER",
      payload: !isLowStockItems,
    });
  }

  function handleSort(e) {
    inventoryDispatch({ type: "SET_SORT_TYPE", payload: e.target.value });
  }

  function handleNew () {
    navigate("/add-new-product")
  }

  return (
    <div className="products-page-container">
      <div className="header-sort-container">
        <h2>Products</h2>

        <select value={department} onChange={handleDepartments}>
          <option value="All">All Departments</option>
          {departments?.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>

        <label>
          <input type="checkbox" onClick={handleInput} />
          Low Stock Items
        </label>

        <select value={sortType} onChange={handleSort}>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>

        <button onClick={handleNew}>New</button>
      </div>

      <div className="table-container">
        <table>
          <tbody>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Supplier</th>
            </tr>

            {sortFilteredInventory?.map(
              ({
                id,
                department,
                name,
                description,
                price,
                stock,
                supplier,
                imageUrl,
              }) => (
                <tr key={id}>
                  <td>
                    <img src={imageUrl} alt={name} />
                  </td>
                  <td>
                    <NavLink to={`/products/${id}`}>{name}</NavLink>
                  </td>
                  <td>{description}</td>
                  <td>{price}</td>
                  <td>{stock}</td>
                  <td>{supplier}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
