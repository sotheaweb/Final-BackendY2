import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";

const Sigin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8180/api/user/login", formData);
      const { token, user } = response.data;
      
      // Save token and user ID in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user.id);

      alert("Login successful!");
      navigate("/");

    } catch (err) {
      setError("Username or password is incorrect");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      {error && <p className="error-message text-red-500">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
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

      <p>Don't have an account?
        <span className="text-blue-600">
          <Link to='/sigup'> Sign up</Link>
        </span>
      </p>
    </div>
  );
};

export default Sigin;
