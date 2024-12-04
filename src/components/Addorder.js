import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Addorder.css";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    product: "",
    quantity: 0,
    price: 0,
    discount: 0,
    status: "Pending", // Default order status
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    const { price, quantity, discount } = formData;
    const total = quantity * price - discount;
    return total > 0 ? total : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://inventory-app-b.vercel.app/product/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An unknown error occurred.");
        setLoading(false);
        setTimeout(() => setError(""), 3000);
        return;
      }

      const result = await response.json();
      alert("Order successfully placed!");
      navigate("/order-completed");
    } catch (error) {
      setError("An error occurred while placing the order.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-form-container">
      <h2>Place Your Order</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="custom-form-group">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="product"
            placeholder="Enter product name"
            value={formData.product}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #242b37",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #242b37",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Price per Item (฿)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #242b37",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Discount (฿)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #242b37",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Order Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid gray",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "10px",
              backgroundColor:'#242b37',
              color:'white'
            }}
            className="form-input"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            {/* <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option> */}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Total Price (฿)</label>
          <input
            type="number"
            value={calculateTotal()}
            readOnly
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #242b37",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
            className="form-input"
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="publish-btn" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
