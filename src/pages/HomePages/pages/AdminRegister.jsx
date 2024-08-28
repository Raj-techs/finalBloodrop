import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/HomeComponents/components/Header";
// import '../../../App.css'

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      alert("Registration successful!");
      navigate("/admin/login");
    } catch (error) {
      alert(error.message);
      console.error("Error:", error);
    }
  };

  return (
    <>
    <Header/>
    <div className="max-w-lg p-3 mx-auto flex flex-col justify-center text-center">
      <h1 className="text-center text-3xl font-semibold">ADMIN REGISTER</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Enter your name"
          id="Name"
          value={formData.Name}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 mt-7"
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 mt-5"
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 mt-5"
          required
        />
        <button className="bg-red-500 p-3 rounded-lg text-white" type="submit">
          REGISTER
        </button>
      </form>
      <div className="flex gap-5 mt-2">
        <p>Already have an account?</p>
        <Link to="/adminlogin">
          <span className="text-red-500 font-semibold">Login</span>
        </Link>
      </div>
    </div></>
  );
};

export default AdminRegister;