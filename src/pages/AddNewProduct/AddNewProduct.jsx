import { useContext, useState } from "react";
import "./addNewProduct.css";
import { InventoryContext } from "../../context/inventory-context";
import { useNavigate } from "react-router-dom";

export function AddNewProduct() {
  const { departments, inventoryDispatch, inventoryState: {inventory} } = useContext(InventoryContext);

  const navigate= useNavigate()

  const [productDetail, setProductDetail] = useState({
    id: inventory?.length+1,
    department: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    sku: "",
    supplier: "",
    delivered: 0,
    imageUrl: "",
  });


  function handleInput (e) {
    setProductDetail({...productDetail, [e.target.name] : e.target.value})
  }

  function handleDepartment (e) {
    setProductDetail({...productDetail, department: e.target.value})
  }

  function handleSubmit (e) {
    e.preventDefault()
    const newId = inventory?.length+1
    setProductDetail({...productDetail, id: newId})
    localStorage.setItem("inventoryData", JSON.stringify([...inventory, productDetail]))
    inventoryDispatch({type: "ADD_PRODUCT", payload: productDetail})
    navigate("/products")
  }

  return (
    <div className="add-new-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label className="block">
          Department:
          <select className="block" name="department" required onChange={(e) => handleDepartment(e)}>
            <option value="">Select Department</option>
            {departments?.map((department, index) => (
              <option key={index} value={department}>{department}</option>
            ))}
          </select>
        </label>
        <label className="block">
          Name:
          <input className="block" type="text" name="name" required onChange={handleInput}/>
        </label>
        <label className="block">
        Description:
          <textarea className="block" cols="30" rows="2" name="description"required onChange={handleInput}></textarea>
        </label>
        <label className="block">
          Price:
          <input className="block" type="number" name="price"required onChange={handleInput}/>
        </label>
        <label className="block">
          Stock:
          <input className="block" type="number" name="stock"required onChange={handleInput}/>
        </label>
        <label className="block">
          SKU:
          <input className="block" type="text" name="sku"required onChange={handleInput} />
        </label>
        <label className="block">
          Supplier:
          <input className="block" type="text" name="supplier"required onChange={handleInput}/>
        </label>
        <label className="block">
          Delivered:
          <input className="block" type="number" name="delivered"required onChange={handleInput}/>
        </label>
        <label className="block">
          Image URL:
          <input className="block" type="url" name="imageUrl"required onChange={handleInput}/>
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
