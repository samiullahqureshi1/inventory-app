import React, { useState, useEffect } from "react";
import "./Inventory.css";
import { Link } from "react-router-dom";

const Inventory = () => {
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
        const response = await fetch('https://inventory-app-b.vercel.app/product/get_product');
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

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   const previews = [];

  //   files.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       previews.push(reader.result);
  //       if (previews.length === files.length) {
  //         setImagePreviews((prev) => [...prev, ...previews]);
  //         setFormData((prev) => ({ ...prev, images?: files }));
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };

  // Toggle the options visibility for a specific product
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = [];
  
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImagePreviews((prev) => [...prev, ...previews]);
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...files], // Update the images? array
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };
  
  
  const handleOptionsToggle = (productId) => {
    setActiveProduct(activeProduct === productId ? null : productId); // Toggle visibility
  };

  // Handle edit and delete (you can define actual functionality for these)
  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product?._id === productId);
    if (!productToEdit) return;

    setFormData({
      product_name: productToEdit.product_name || "",
      quantity: productToEdit.quantity || 0,
      price: productToEdit.price || 0,
      category:productToEdit.category || "",
      discription: productToEdit.discription || "",
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true); 
    const newProductData = new FormData();
    newProductData.append("product_name", formData.product_name); // Corrected field name
    newProductData.append("quantity", formData.quantity); // Corrected field name
    newProductData.append("price", formData.price);
    newProductData.append("discription", formData.discription); // Corrected field name
    newProductData.append("category", formData.category); // Corrected field name

    // Append images? to FormData
    formData.images?.forEach((image) => {
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
              product?._id === activeProduct ? { ...product, ...data.product } : product
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
      setAlertMessage(error.message ||"Error submitting form. Please try again.");
    } finally {
      setFormLoading(false);
      setTimeout(() => setAlertMessage(null), 3000); // Hide alert after 3 seconds
    }
  };

 
  return (
    <div>
      {/* Navbar
      {alertMessage && (
  <div className={`alert ${alertType}`}>
    {alertMessage}
  </div>
)} */}

      
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
        </div>
        <div className="action">
          <div className="search-bars">
            <input type="text" placeholder="Search product?..." />
            <button className="search-icons">🔍</button>
          </div>
          <button className="add-products" onClick={toggleModal}>
            Add Product
          </button>
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
            <div className="product-card" key={product?._id}>
              {/* <img
                src={product?.images && product?.images?.length > 0 ? product?.images[0] : "https://via.placeholder.com/150"}
                alt={product?.product_name}
                className="product-image"
              /> */}
              <div className="product-details">
                <h3 className="product-name">{product?.product_name || "Unnamed Product"}</h3>
                <div className="product-info">
                  <span className="product-description">{product?.discription || "No description available"}</span>
                  <span className="product-description">{product?.category || "No category available"}</span>

                  <span className="product-status">
                    <span style={{ color: product?.in_stock ? "green" : "red" }}>
                      {product?.in_stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </span>
                  <span className="product-quantity">Quantity: {product?.quantity || 0}</span>
                  <span className="product-price">Price: ฿{product?.price || "N/A"}</span>
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
                    <button onClick={() => handleEdit(product?._id)}>Edit</button>
                    <button onClick={() => handleDelete(product?._id)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Adding Product */}
      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-container">
          {alertMessage && (
  <div className={`alert ${alertType}`}>
    {alertMessage}
  </div>
)}
            <button className="custom-modal-close" onClick={toggleModal}>
              ✖
            </button>
            <div className="custom-modal-content">
              <div className="custom-modal-left">
                {/* <h2>Product Preview</h2>
                <div className="custom-product-image-container">
                  <img
                    src={imagePreviews[0] || "https://via.placeholder.com/150"}
                    alt="Product Preview"
                    className="custom-product-image"
                  />
                </div> */}
              </div>

              <div className="custom-modal-right">
              <h2>{isEditing ? "Edit Product" : "Add Product"}</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="custom-form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      placeholder="Enter product name"
                      value={formData.product_name} // Corrected field name
                      onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #242b37',
                        borderRadius: '4px',
                        fontSize: '14px',
                        marginBottom: '10px',
                      }}
                    />
                  </div>
                  <div className="custom-form-group">
                    <label>Product Category</label>
                    <input
                      type="text"
                      placeholder="Enter category"
                      value={formData.category} // Corrected field name
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #242b37',
                        borderRadius: '4px',
                        fontSize: '14px',
                        marginBottom: '10px',
                      }}
                    />
                  </div>
                  <div className="custom-form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #242b37',
                        borderRadius: '4px',
                        fontSize: '14px',
                        marginBottom: '10px',
                      }}
                    />
                  </div>
                  <div className="custom-form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #242b37',
                        borderRadius: '4px',
                        fontSize: '14px',
                        marginBottom: '10px',
                      }}
                    />
                  </div>
                  <div className="custom-form-group">
                    <label>Description</label>
                    <textarea
                      value={formData.discription}
                      onChange={(e) => setFormData({ ...formData, discription: e.target.value })}
                       rows="4"
                      className="custom-textarea"
                    />
                  </div>
                  {/* <div className="custom-form-group">
                    <label>images</label>
                    <input
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #242b37',
                        borderRadius: '4px',
                        fontSize: '14px',
                        marginBottom: '10px',
                      }}
                    />
                  </div> */}
                  <div className="form-actions">
                  <button className="btn-submit" type="submit" enable={formLoading}>
                  {formLoading ? "Submitting..." : isEditing ? "Update Product" : "Add Product"}
              </button>
                    <button className="btn-cancel" type="button" onClick={toggleModal}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;



