import React, { useState, useEffect } from "react";
import "./Inventory.css";
import { Link } from "react-router-dom";

const Expired = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formLoading, setFormLoading] = useState(false); // Loader for form submission
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(""); // 'success' or 'error'
  const [isEditing, setIsEditing] = useState(false); // Track if editing a product
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const [activeProduct, setActiveProduct] = useState(null); // Track the active product for options
  const [formData, setFormData] = useState({
    product_name: "", // Corrected field name
    quantity: 0,      // Corrected field name
    price: 0,
    category:"",
    discription: "",  // Corrected field name
    images: [],
    expiry_date: "",
  });
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchExpiredProducts = async () => {
      try {
        const response = await fetch("https://inventory-app-b.vercel.app/product/cron");
        
        if (!response.ok) {
          throw new Error("Failed to fetch expired products.");
        }

        const data = await response.json();
        setProducts(data.data || []); // Ensure data is set properly
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchExpiredProducts();
  }, []);

  

  
  

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    setImagePreviews([]); // Clear previews when closing or opening the modal
  };

  
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
      expiry_date:productToEdit.expiry_date || '',
      images: [] // No need to populate images?, as they aren't directly editable
    });

    setImagePreviews(productToEdit.images || []);
    setIsEditing(true); // Set editing mode
    setActiveProduct(productId); // Close the options box
    toggleModal();
  };


  const handleDelete = async (productId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`https://inventory-app-b.vercel.app/product/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setProducts((prev) => prev.filter((product) => product?._id !== productId)); // Update UI
      setAlertType("success");
      setAlertMessage("Product successfully deleted.");
    } else {
      const data = await response.json();
      setAlertType("error");
      setAlertMessage(data.message || "Failed to delete product?.");
    }
  } catch (error) {
    setAlertType("error");
    setAlertMessage("Error deleting product?. Please try again.");
  } finally {
    setTimeout(() => setAlertMessage(null), 3000); // Hide alert after 3 seconds
  }
};

  
  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options); // e.g., December 31, 2024
  };


  

  
  
 
  return (
    <div>
     
      
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
          <p className="product-titles">Product</p>
          <span className="total-product">{products.length} total products</span>
          <Link to="/epired">
            <button className="new-button" style={{fontSize:'10px'}}>Expired Product</button>
          </Link>
        </div>
        <div className="action">
          <div className="search-bars">
            <input type="text" placeholder="Search product..." />
            <button className="search-icons">🔍</button>
          </div>
          
          
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
             
              <div className="product-details">
                <h3 className="product-name">{product.product_name }</h3>
                <div className="product-info">
                  <span className="product-description">{product.discription }</span>
                  <span className="product-description">{product.category }</span>

                  <span className="product-status">
                    <span style={{ color: product.in_stock ? "green" : "red" }}>
                      {product?.in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </span>
                  <span className="product-quantity">Quantity: {product.quantity || 0}</span>
                  <span className="product-price">Price: ฿{product.price || "N/A"}</span>
                  <span className="product-price">ExpiresAt: {formatDate(product.expiry_date) }</span>

                </div>
              </div>

              {/* Three Dots Options */}
              <div className="options-container">
                <span
                  className="three-dots"
                  onClick={() => handleOptionsToggle(product?._id)}
                >
                  ⋮
                </span>
                {activeProduct === product?._id && (
                  <div className="options-box">
                    
                    <button onClick={() => handleDelete(product?._id)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Adding Product */}
   
    </div>
  );
};

export default Expired;



