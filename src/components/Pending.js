import React, { useState, useEffect } from "react";
import "./Inventory.css";
import { Link } from "react-router-dom";

const Pending = () => {
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
        const response = await fetch('https://inventory-app-b.vercel.app/product/getorderpending');
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImagePreviews((prev) => [...prev, ...previews]);
          setFormData((prev) => ({ ...prev, images: files }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

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

    setImagePreviews(productToEdit.images || []);
    setIsEditing(true); // Set editing mode
    setActiveProduct(productId); // Close the options box
    toggleModal();
  };


  const handleDelete = async (productId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this order?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`https://inventory-app-b.vercel.app/product/order${productId}`, {
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

//..................>updateorder................>
const handleCompleteOrder = async (orderId) => {
  try {
    const response = await fetch(`https://inventory-app-b.vercel.app/product/orderupdate/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Completed" }),
    });

    if (response.ok) {
      // Update UI after the status change
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === orderId ? { ...product, status: "Completed" } : product
        )
      );
      setAlertType("success");
      setAlertMessage("Order marked as completed!");
    } else {
      const data = await response.json();
      setAlertType("error");
      setAlertMessage(data.message || "Failed to complete order.");
    }
  } catch (error) {
    setAlertType("error");
    setAlertMessage("Error updating order. Please try again.");
  } finally {
    setTimeout(() => setAlertMessage(null), 3000); // Hide alert after 3 seconds
  }
};
//..............................................orderupdate end............>

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newProductData = new FormData();
    newProductData.append("product_name", formData.product_name); // Corrected field name
    newProductData.append("quantity", formData.quantity); // Corrected field name
    newProductData.append("price", formData.price);
    newProductData.append("discription", formData.discription); // Corrected field name
    newProductData.append("category", formData.category); // Corrected field name

    // Append images to FormData
    formData.images.forEach((image) => {
      newProductData.append("images", image);
    });

    try {
      const response = isEditing
        ? await fetch(
            `https://inventory-app-b.vercel.app/product/update_product/${activeProduct}`, // Use product ID in URL
            {
              method: "PATCH",
              body: newProductData,
            }
          )
        : await fetch("https://inventory-app-b.vercel.app/product/create_product", {
            method: "POST",
            body: newProductData,
          });

      const data = await response.json();

      if (response.ok) {
        setAlertType("success");
        setAlertMessage(isEditing ? "Product updated successfully!" : "Product added successfully!");
        if (isEditing) {
          // Update product in UI
          setProducts((prev) =>
            prev.map((product) =>
              product._id === activeProduct ? { ...product, ...data.product } : product
            )
          );
        } else {
          // Add new product to UI
          setProducts((prev) => [...prev, data.product]);
        }
        toggleModal();
      } else {
        setAlertType("error");
        setAlertMessage(data.message || "Failed to submit form.");
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage("Error submitting form. Please try again.");
    } finally {
      setFormLoading(false);
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
              <Link to="/order-completed" style={{ color: 'white', textDecoration: 'none' }}>Order</Link>
            </li>
        </ul>
      </div>
    </div>
      {/* Dashboard Section */}
      <div className="dashboard-sections">
        <div className="product-infos">
          <p className="product-titles">Order</p>
          <span className="total-product">{products.length} total order</span>
          <Link to='/order-completed'><button className="new-button">Completed</button></Link>
          <Link to='/order-proccessing'><button className="new-button">Proccessing</button></Link>
          <Link to='/order-pending'><button className="new-button">Pending</button></Link>
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
          <p>No Pending order found.</p>
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
                  <button
  className="complete-button"
  onClick={() => handleCompleteOrder(product._id)}
>
  Complete
</button>

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

export default Pending;



