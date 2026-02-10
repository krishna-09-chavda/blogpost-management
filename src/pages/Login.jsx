import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    //console.log(e.target.name,e.target.value)
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!loginData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = "Invalid Email format.";
    }
    if (!loginData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Minimum 6 character required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const storedUser = JSON.parse(localStorage.getItem("authData"));
      if (
        storedUser.email === loginData.email &&
        storedUser.password === loginData.password
      ) {
        //alert("Login Successfull");
        localStorage.setItem("loginData", JSON.stringify(loginData));
        navigate("/dashboard");
      } else {
        alert("Invalid email or password");
      }
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="form-container">
        <h1 className="form-title">Welcome Back</h1>
        <h3 className="short-title">Please login to your account</h3>
        <form onSubmit={handleSubmit}>
          {/*email feild */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={loginData.email}
              placeholder="Enter your email"
              onChange={handleInputChange}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>
          {/*passwrod field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginData.password}
              placeholder="Enter your password"
              onChange={handleInputChange}
            />
            {errors.password && (
              <span className="error-msg">{errors.password}</span>
            )}
          </div>
          {/*submit button */}
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
        {/*link to register page */}
        <p className="link-text">
          Don't have an accout? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
