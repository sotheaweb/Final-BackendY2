import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Auth.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5"; 
import { Link } from "react-router-dom";

const Sigin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Store error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get stored user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No user found. Please sign up first.");
      return;
    }

    // Check if email and password match
    if (formData.email === storedUser.email && formData.password === storedUser.password) {
      alert("Login successful!");
      navigate("/"); // Redirect to home page
    } else {
      setError(<span className="text-red-500">Incorrect email or password. Please try again.</span>);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      
      {error && <p className="error-message">{error}</p>} {/* Show error message */}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Enter Email" 
          value={formData.email}  
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        
        <div className="Check-input">
          <input type="checkbox" id="user-check" />
          <label htmlFor="user-check" className="mt-2">Remember me</label>
        </div>

        <button type="submit" className="transition delay-100 cursor-pointer">Login</button>
      </form>
      
      <p>Continue with</p>
      <div className="social-icons">
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer"><FcGoogle size={25} /></a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={25} color="#1877F2" /></a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><IoLogoLinkedin size={25} color="#0077B5" /></a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagramSquare size={25} color="#E4405F" /></a>
      </div>

      <p>Don't you have an account?          
        <span className="text-blue-600 " onClick={() => setCurrentPage("SigUp")}>
             <Link to='/sigup'> Sign up</Link>
        </span>
     </p>
    </div>
  );
};

export default Sigin;