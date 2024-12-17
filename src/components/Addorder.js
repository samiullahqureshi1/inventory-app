import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Addorder.css";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    product: "",
    quantity: 0,
    price: 0,
    discount: 0,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    status: "Pending",
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
      const response = await fetch(
        "https://inventory-app-b.vercel.app/product/createorder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An unknown error occurred.");
        setLoading(false);
        setTimeout(() => setError(""), 3000);
        return;
      }

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
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="product"
            placeholder="Enter product name"
            value={formData.product}
            onChange={handleInputChange}
            className="form-input"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #242b37",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="form-input"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #242b37",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
            required
          />
        </div>
        <div className="form-group">
          <label>Price per Item (฿)</label>
          <input
            type="number"
            name="price"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #242b37",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
            value={formData.price}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Discount (฿)</label>
          <input
            type="number"
            name="discount"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #242b37",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
            value={formData.discount}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Order Status</label>
          <select
            name="status"
            value={formData.status}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #242b37",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
          </select>
        </div>
        <div className="form-group">
          <label>Total Price (฿)</label>
          <input
            type="number"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #242b37",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
            value={calculateTotal()}
            readOnly
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            name="customerName"
            placeholder="Enter customer name"
            value={formData.customerName}
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
          <label>Customer Email</label>
          <input
            type="email"
            name="customerEmail"
            placeholder="Enter customer email"
            value={formData.customerEmail}
            onChange={handleInputChange}
            className="form-input"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #242b37",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
            required
          />
        </div>
        <div className="form-group">
          <label>Customer Phone</label>
          <input
            type="tel"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleInputChange}
            className="form-input"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #242b37",
              borderRadius: "4px",
              fontSize: "14px",
              marginBottom: "10px",
            }}
            placeholder="Enter phone number"
            required
          />
        </div>
        <button type="submit" className="publish-btn" disabled={loading}>
          {loading ? <div className="spinner"></div> : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
