import React, { useState } from "react";
import "./Addorder.css";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    product: "",
    quantity: 0,
    price: 0,
    discount: 0,
    totalPrice: 0,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed with total price: ฿${calculateTotal()}`);
  };

  return (
    <div className="order-form-container">
      <h2>Place Your Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="custom-form-group">
          <label
            style={{
              display: "block", // Ensures the label is on its own line
              textAlign: "left", // Aligns the text to the left
              fontSize: "14px", // Optional: Adjust font size
              fontWeight: "bold", // Optional: Make the text bold
              marginBottom: "5px", // Adds space between the label and the input
              color: "#fff", // Optional: Set label text color
            }}
          >
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            value={formData.product_name}
            onChange={(e) =>
              setFormData({ ...formData, product_name: e.target.value })
            }
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
          <label
            style={{
              display: "block", // Ensures the label is on its own line
              textAlign: "left", // Aligns the text to the left
              fontSize: "14px", // Optional: Adjust font size
              fontWeight: "bold", // Optional: Make the text bold
              marginBottom: "5px", // Adds space between the label and the input
              color: "#fff", // Optional: Set label text color
            }}
          >
            Quantity
          </label>
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
            required
          />
        </div>
        <div className="form-group">
          <label
            style={{
              display: "block", // Ensures the label is on its own line
              textAlign: "left", // Aligns the text to the left
              fontSize: "14px", // Optional: Adjust font size
              fontWeight: "bold", // Optional: Make the text bold
              marginBottom: "5px", // Adds space between the label and the input
              color: "#fff", // Optional: Set label text color
            }}
          >
            Price per Item (฿)
          </label>
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
            required
          />
        </div>
        <div className="form-group">
          <label
            style={{
              display: "block", // Ensures the label is on its own line
              textAlign: "left", // Aligns the text to the left
              fontSize: "14px", // Optional: Adjust font size
              fontWeight: "bold", // Optional: Make the text bold
              marginBottom: "5px", // Adds space between the label and the input
              color: "#fff", // Optional: Set label text color
            }}
          >
            Discount (฿)
          </label>
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
          />
        </div>
        <div className="form-group">
          <label
            style={{
              display: "block", // Ensures the label is on its own line
              textAlign: "left", // Aligns the text to the left
              fontSize: "14px", // Optional: Adjust font size
              fontWeight: "bold", // Optional: Make the text bold
              marginBottom: "5px", // Adds space between the label and the input
              color: "#fff", // Optional: Set label text color
            }}
          >
            Total Price (฿)
          </label>
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
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="publish-btn">
            Place Order
          </button>
          {/* <button type="button" className="draft-btn">
            Save as Draft
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
