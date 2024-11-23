


import React, { useState, useEffect } from "react";
import "./Inventory.css";
import { Link } from "react-router-dom";

const OutStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formLoading, setFormLoading] = useState(false); // Loader for form submission
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(""); // 'success' or 'error'
  const [isEditing, setIsEditing] = useState(false); // Track if editing a product

  const [activeProduct, setActiveProduct] = useState(null); // Track the active product for options
  const [formData, setFormData] = useState({
    product_name: "", // Corrected field name
    quantity: 0,      // Corrected field name
    price: 0,
    discription: "",  // Corrected field name
    images: []
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://inventory-app-b.vercel.app/product/out');
        const text = await response.text();
        console.log(text);

        const data = JSON.parse(text);
        console.log(data);

        setProducts(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  
  // Toggle the options visibility for a specific product
  const handleOptionsToggle = (productId) => {
    setActiveProduct(activeProduct === productId ? null : productId); // Toggle visibility
  };

  // Handle edit and delete (you can define actual functionality for these)
  


  const handleDelete = async (productId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`https://inventory-app-b.vercel.app/product/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setProducts((prev) => prev.filter((product) => product._id !== productId)); // Update UI
      setAlertType("success");
      setAlertMessage("Product successfully deleted.");
    } else {
      const data = await response.json();
      setAlertType("error");
      setAlertMessage(data.message || "Failed to delete product.");
    }
  } catch (error) {
    setAlertType("error");
    setAlertMessage("Error deleting product. Please try again.");
  } finally {
    setTimeout(() => setAlertMessage(null), 3000); // Hide alert after 3 seconds
  }
};

  
  return (
    <div>
      {/* Navbar */}
      {alertMessage && (
  <div className={`alert ${alertType}`}>
    {alertMessage}
  </div>
)}

      <div className="navbar-containers">
        <h2 className="navbar-headings">Inventory</h2>
        <div className="navbar-link">
          <ul>
            <li>
              <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
            </li>
            <li>
              <Link to="/inventory" style={{ color: 'white', textDecoration: 'none' }}>Inventory</Link>
            </li>
            <li>
              <Link to="/raw-material" style={{ color: 'white', textDecoration: 'none' }}>Raw Material</Link>
            </li>
            <li>
              <Link to="/out-of-stock" style={{ color: 'white', textDecoration: 'none' }}>Out of Stock</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="dashboard-sections">
        <div className="product-infos">
          <p className="product-titles">Out-Of-Stock</p>
          <span className="total-product">{products.length} total products</span>
        </div>
      </div>

      {/* Product List Section */}
      <div className="product-list">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <img
                src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/150"}
                alt={product.product_name}
                className="product-image"
              />
              <div className="product-details">
                <h3 className="product-name">{product.product_name || "Unnamed Product"}</h3>
                <div className="product-info">
                  <span className="product-description">{product.discription || "No description available"}</span>
                  <span className="product-status">
                    <span style={{ color: product.in_stock ? "green" : "red" }}>
                      {product.in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </span>
                  <span className="product-quantity">Quantity: {product.quantity || 0}</span>
                  <span className="product-price">Price: ${product.price || "N/A"}</span>
                </div>
              </div>

              {/* Three Dots Options */}
              <div className="options-container">
                <span
                  className="three-dots"
                  onClick={() => handleOptionsToggle(product._id)}
                >
                  ⋮
                </span>
                {activeProduct === product._id && (
                  <div className="options-box">
                  
                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

     
        </div>
     
  );
};

export default OutStock;



