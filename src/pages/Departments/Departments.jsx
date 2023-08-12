import { useContext } from "react";
import "./departments.css";
import { InventoryContext } from "../../context/inventory-context";
import { useNavigate } from "react-router-dom";

export function Departments() {
  const {
    inventoryDispatch,
    departments,
  } = useContext(InventoryContext);

  const navigate = useNavigate()

  function handleDepartment(department) {
    inventoryDispatch({type: "SET_DEPARTMENT_FILTER", payload: department})
    navigate("/products")
  }

  return (
    <div className="departments-container">
      {departments?.map((department, index) => (
        <h3
          key={index}
          className="department-container"
          onClick={() => handleDepartment(department)}
        >
          {department}
        </h3>
      ))}
    </div>
  );
}
