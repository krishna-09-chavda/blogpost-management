import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  //declaration
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  //logic
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.length <= 3) {
      newErrors.name = "Minimum 3 character required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid Email format.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be in 10 digit.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 character required.";
    }
    if (!formData.confirm.trim()) {
      newErrors.confirm = "Confirm password is required";
    } else if (formData.confirm != formData.password) {
      newErrors.confirm = "Confirm password must be same as password.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
      localStorage.setItem("authData", JSON.stringify(formData));
      // alert("Registration success");
      toast.success("Registration Succesful")
       navigate("/login");
    }
  };
  //design
  return (
    <>
      <div className="form-container">
        <h1 className="form-title">Create Account</h1>
        <h3 className="short-title">Join us and start your journy</h3>
        <form onSubmit={handleSubmit}>
          {/* name field */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              placeholder="Enter your full name"
              onChange={handleInputChange}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>
          {/*email field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleInputChange}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>
          {/*phone number field */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              placeholder="Enter your phone number"
              onChange={handleInputChange}
            />
            {errors.phone && <span className="error-msg">{errors.phone}</span>}
          </div>
          {/*password field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="Creat a password"
              onChange={handleInputChange}
            />
            {errors.password && (
              <span className="error-msg">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              id="confirm"
              value={formData.confirm}
              placeholder="Confirm password"
              onChange={handleInputChange}
            />
            {errors.confirm && (
              <span className="error-msg">{errors.confirm}</span>
            )}
          </div>

          {/*submit button */}
          <button type="submit" className="btn-primary">
            Register
          </button>
        </form>
        {/*link to login page */}
        <p className="link-text">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
