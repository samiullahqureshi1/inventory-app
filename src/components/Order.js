import React, { useState, useEffect } from "react";
import "./Inventory.css";
import { Link } from "react-router-dom";

const Order = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(""); // 'success' or 'error'
  const [isEditing, setIsEditing] = useState(false); // Track if editing a product
  const [isOpen, setIsOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null); // Track the active product for options
  const [formData, setFormData] = useState({
    product_name: "", // Corrected field name
    quantity: 0,      // Corrected field name
    price: 0,
    category:"",
    discription: "",  // Corrected field name
    images: []
  });
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://inventory-app-b.vercel.app/product/weeklysales');
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
  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    if (!productToEdit) return;

    setFormData({
      product_name: productToEdit.product_name || "",
      quantity: productToEdit.quantity || 0,
      price: productToEdit.price || 0,
      category:productToEdit.category || "",
      discription: productToEdit.discription || "",
      images: [] // No need to populate images, as they aren't directly editable
    });

   
  };


  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://inventory-app-b.vercel.app/product/order/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setProducts((prev) =>
          prev.filter((product) => product._id !== productId)
        ); // Update UI
        setAlertType("success");
        setAlertMessage("order successfully deleted.");
      } else {
        const data = await response.json();
        setAlertType("error");
        setAlertMessage(data.message || "Failed to delete order.");
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage("Error deleting order. Please try again.");
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
      <div className="hamburger" onClick={toggleMenu}>
        {/* Hamburger icon */}
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
      </div>
      <div className={`navbar-link ${isOpen ? 'open' : ''}`}>
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
            <li>
              <Link to="/order-completed" style={{ color: 'white', textDecoration: 'none' }}>Orders</Link>
            </li>
            <li>
              <Link to="/weekly-sales" style={{ color: 'white', textDecoration: 'none' }}>Sales</Link>
            </li>
        </ul>
      </div>
    </div>
      {/* Dashboard Section */}
      <div className="dashboard-sections">
        <div className="product-infos">
          <p className="product-titles">Sales</p>
          <span className="total-product">{products.length} total sales</span>
          <Link to='/weekly-sales'><button className="new-button">Weekly</button></Link>
          <Link to='/monthly-sales'><button className="new-button">Monthly</button></Link>
          <Link to='/sales-history'><button className="new-button">History</button></Link>
        </div>
        <div className="action">
          <div className="search-bars">
            <input type="text" placeholder="Search product..." />
            <button className="search-icons">🔍</button>
          </div>
        {/* <Link to={'/add-order'}> <button className="add-products" onClick={toggleModal}>
            Add Order
          </button></Link>  */}
        </div>
      </div>

      {/* Product List Section */}
      <div className="product-list">
        {loading ? (
          <p>Loading sales...</p>
        ) : products.length === 0 ? (
          <p>No weekly sales found.</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
             
              <div className="product-details">
                <h3 className="product-name">{product.product || "Unnamed Product"}</h3>
                <div className="product-info">
                  <span className="product-description">Quantity:{product.quantity || "No description available"}</span>
                  <span className="product-description">฿ {product.price || "No category available"}</span>

                  
                  <span className="product-quantity">Discount: ฿{product.discount || 0}</span>
                  <span className="product-price">Total Price: ฿{product.totalPrice }</span>
                  <span className="product-price">status: {product.status }</span>
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
                    <button onClick={() => handleEdit(product._id)}>Edit</button>
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

export default Order;



