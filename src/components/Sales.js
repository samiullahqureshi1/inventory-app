import React, { useState, useEffect } from "react";
import "./Inventory.css";
import { Link } from "react-router-dom";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formLoading, setFormLoading] = useState(false); // Loader for form submission
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(""); // 'success' or 'error'
  const [isEditing, setIsEditing] = useState(false); // Track if editing a product
  const [isOpen, setIsOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null); // Track the active product for options
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://inventory-app-b.vercel.app/product/getorder');
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

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    setImagePreviews([]); // Clear previews when closing or opening the modal
  };

  

  // Toggle the options visibility for a specific product
  const handleOptionsToggle = (productId) => {
    setActiveProduct(activeProduct === productId ? null : productId); // Toggle visibility
  };

  // Handle edit and delete (you can define actual functionality for these)
  


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


  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(
        `https://inventory-app-b.vercel.app/product/orderupdatecancell/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Cancelled" }),
        }
      );

      if (response.ok) {
        // Update UI after the status change
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === orderId
              ? { ...product, status: "Cancelled" }
              : product
          )
        );
        setAlertType("success");
        setAlertMessage("Order marked as Cancelled!");
      } else {
        const data = await response.json();
        setAlertType("error");
        setAlertMessage(data.message || "Failed to Cancelled order.");
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage("Error updating order. Please try again.");
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

      {/* <div className="navbar-containers">
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
      </div> */}
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
            <li>
              <Link to="/employeement" style={{ color: 'white', textDecoration: 'none' }}>HR</Link>
            </li>
        </ul>
      </div>
    </div>
      {/* Dashboard Section */}
      <div className="dashboard-sections">
        <div className="product-infos">
          <p className="product-titles">Order</p>
          <span className="total-product">{products.length} total order</span>
          <Link to='/order-completed'><button className="new-button">Delivered</button></Link>
          <Link to='/order-proccessing'><button className="new-button">Proccessing</button></Link>
          <Link to='/order-pending'><button className="new-button">Pending</button></Link>
          <Link to="/order-cancell">
                      <button className="new-button">Cancell</button>
                    </Link>
        </div>
        <div className="action">
          <div className="search-bars">
            <input type="text" placeholder="Search product..." />
            <button className="search-icons">🔍</button>
          </div>
        <Link to={'/add-order'}> <button className="add-products" onClick={toggleModal}>
            Add Order
          </button></Link> 
        </div>
      </div>

      {/* Product List Section */}
      <div className="product-list">
        {loading ? (
          <p>Loading orders...</p>
        ) : products.length === 0 ? (
          <p>No completed order found.</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              {/* <img
                src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/150"}
                alt={product.product_name}
                className="product-image"
              /> */}
              <div className="product-details">
                <h3 className="product-name">{product.product || "Unnamed Product"}</h3>
                <div className="product-info">
                  <span className="product-description">Quantity:{product.quantity || "No description available"}</span>
                  <span className="product-description">฿ {product.price || "No category available"}</span>

                  
                  <span className="product-quantity">Discount: ฿{product.discount || 0}</span>
                  <span className="product-price">Total Price: ฿{product.totalPrice }</span>
                  <span className="product-price">
                  customerName: {product.customerName}
                  </span>
                  <span className="product-price">
                  customerEmail: {product.customerEmail}
                  </span>
                  <span className="product-price">
                  customerPhone: {product.customerPhone}
                  </span>
                  <span className="product-price">status: {product.status }</span>
                  <span className="product-price">DeliverAt:{new Date(product.deliveredAt).toLocaleDateString()}</span>
                 
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

export default Sales;



