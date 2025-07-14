import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5"; 
import { Link } from "react-router-dom";
import axios from "axios"; 
import "./Auth.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { first_name, last_name, username, email, phone, password } = formData;

    if (!first_name || !last_name || !username || !email || !phone || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8180/api/user/register", {
        first_name,
        last_name,
        username,
        email,
        phonenumber: phone,
        password,
      });
      const userId = response.data.user.id
      localStorage.setItem("user_id", userId);
      alert(`Welcome, ${last_name}! Your account has been created.`);

      // Redirect to login
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create New Account</h2>

      {error && <p className="error-message">{error}</p>} 

      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account?
        <span className="text-blue-600">
          <Link to='/signin'> Sign In</Link>
        </span>
      </p>
      
      <div className="social-icons">
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer"><FcGoogle size={25} /></a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={25} color="#1877F2" /></a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><IoLogoLinkedin size={25} color="#0077B5" /></a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagramSquare size={25} color="#E4405F" /></a>
      </div>
    </div>
  );
};

export default SignUp;
