import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./LoginSignup.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);

  // State variables for form inputs
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // useNavigate hook to programmatically navigate
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://inventory-app-b.vercel.app/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Successfully logged in!");
        // Store token in localStorage
        localStorage.setItem("token", data.token);

        // Redirect to the dashboard page
        navigate('/dashboard'); // Navigate to dashboard after login
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }finally {
      setTimeout(() => setAlertMessage(null), 3000); // Hide alert after 3 seconds
    }
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('https://inventory-app-b.vercel.app/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! Please login.");
        setIsLogin(true); // Switch to login view after successful signup
      } else {
        setError(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }finally {
      setTimeout(() => setAlertMessage(null), 3000); // Hide alert after 3 seconds
    }
  };

  return (
    <div className="auth-container" style={{ height: isLogin ? "400px" : "550px" }}>
      <div className="auth-header">
        <button className={`auth-tab ${isLogin ? "active-tab" : ""}`} onClick={() => setIsLogin(true)}>
          Login
        </button>
        <button className={`auth-tab ${!isLogin ? "active-tab" : ""}`} onClick={() => setIsLogin(false)}>
          Signup
        </button>
      </div>
      <div className="auth-body">
        <div className="auth-slider" style={{ transform: isLogin ? "translateX(0)" : "translateX(-50%)" }}>
          <div className="auth-form">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button className="auth-button" onClick={handleSubmitLogin}>
              Login
            </button>
          </div>
          <div className="auth-form">
            <h2>Signup</h2>
            {error && <p className="error-message">{error}</p>}
            <input 
              type="text" 
              placeholder="Full Name" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            <button className="auth-button" onClick={handleSubmitSignup}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
