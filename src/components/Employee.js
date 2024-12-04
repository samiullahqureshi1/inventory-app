import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Addorder.css";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joiningDate: "",
    salary: 0,
    address: "",
    status: "Active", // Default status
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://inventory-app-b.vercel.app/product/postemployee", {
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
      alert("Employee added successfully!");
      navigate("/employeement");
    } catch (error) {
      setError("An error occurred while adding the employee.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-form-container">
      <h2>Add New Employee</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="custom-form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #242b37",
                borderRadius: "4px",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            placeholder="Enter employee's name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #242b37",
                borderRadius: "4px",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            placeholder="Enter employee's email"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
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

        <div className="form-group">
          <label className="form-label">Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #242b37",
                borderRadius: "4px",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            placeholder="Enter designation"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #242b37",
                borderRadius: "4px",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            placeholder="Enter department"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
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
          <label className="form-label">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #242b37",
                borderRadius: "4px",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            placeholder="Enter salary"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            style={{
                width: "100%",
                padding: "8px",
                border: "1px solid gray",
                borderRadius: "4px",
                fontSize: "14px",
                marginBottom: "10px",
                backgroundColor:'#242b37',
                color:'white',
                overflow:'hidden'
              }}
            placeholder="Enter address"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
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
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="publish-btn" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
