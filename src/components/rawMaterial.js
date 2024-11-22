import React, { useState, useEffect } from "react";
import "./material.css";
import { Link } from "react-router-dom";

const RawMaterial = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // Loading state
  const [showModal, setShowModal] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]); // State for storing multiple image previews
  // Fetch out-of-stock products from the API
  useEffect(() => {
    const fetchOutOfStockProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/product/get_product"); // Replace with your API endpoint
        const data = await response.json(); // Parse the JSON response
        if (data.success) {
          setProducts(data.data); // Set products state with out-of-stock products
        }
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching out-of-stock products:", error);
        setLoading(false);
      }
    };

    fetchOutOfStockProducts();
  }, []);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    setImagePreviews([]); // Clear previews when closing or opening the modal
  };

  //..........image preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImagePreviews((prev) => [...prev, ...previews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };


  return (
    <div>
      {/* Navbar */}
      <div className="navbar-containers">
        <h2 className="navbar-headings">Inventory</h2>
        <div className="navbar-link">
          <ul>
            <li>
              <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/inventory" style={{ color: "white", textDecoration: "none" }}>
                Inventory
              </Link>
            </li>
            <li>
              <Link to="/raw-material" style={{ color: "white", textDecoration: "none" }}>
                Raw Material
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="dashboard-sections">
        <div className="product-infos">
          <p className="product-titles">Out-of-Stock Products</p>
          <span className="total-product">{products.length} total products</span>
        </div>
        <button className="add-products" onClick={toggleModal}>
            Add Product
          </button>
      </div>

      {/* Product List Section */}
      <div className="product-list">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <img
                src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/50"}
                alt={product.product_name}
                className="product-image"
              />
              <div className="product-details">
                <h3>{product.product_name}</h3>
                <p>{product.discription || "No description available"}</p>
                <p>{product.in_stock ? "In Stock" : "Out of Stock"}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-container">
            <button className="custom-modal-close" onClick={toggleModal}>
              ✖
            </button>
            <div className="custom-modal-content">
              {/* Left Section */}
              <div className="custom-modal-left">
                <h2>Material Preview</h2>
                <div className="custom-product-image-container">
                  <img
                    src={imagePreviews[0] || "https://via.placeholder.com/150"} // Display the first image or a placeholder
                    alt="Product Preview"
                    className="custom-product-image"
                  />
                </div>
                <div className="custom-thumbnail-container">
                  {imagePreviews.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="custom-thumbnail"
                      onClick={() =>
                        setImagePreviews((prev) => [img, ...prev.filter((_, i) => i !== index)])
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Right Section */}
              <div className="custom-modal-right">
                <h2>Add Material</h2>
                <form>
                  <div className="custom-form-group">
                    <label>Material Name</label>
                    <input
                      type="text"
                      placeholder="Enter product name"
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
                    <label>Supplier Name</label>
                    <input
                      type="text"
                      placeholder="Enter category"
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
                    <label>Stock Quantity</label>
                    <input
                      type="number"
                      placeholder="Enter stock quantity"
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
                  {/* <div className="custom-form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      placeholder="Enter price"
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
                  <div className="custom-form-group">
                    <label>Upload Image</label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      multiple // Allow multiple files
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
                      placeholder="Enter product description"
                      rows="4"
                      className="custom-textarea"
                    />
                  </div>
                  <button type="submit" className="custom-save-button">
                    Save 
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RawMaterial;
