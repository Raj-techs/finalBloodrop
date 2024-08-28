import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/HomeComponents/components/Header";
import axios from "axios";
import { toast } from 'react-toastify'; 
// import '../../../App.css'

const Login = () => {
  const [token,setToken]=useState()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobileNo: "", // Added mobileNo field
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://json-server-api-vcou.onrender.com/registered');
      const user = response.data.find(
        user => user.email === formData.email && user.password === formData.password
      );

      if (user) {
        localStorage.setItem('email', user.email);
        localStorage.setItem('username', user.username);
        toast.success("😁 Login successful!");
        navigate('/user/home');
      } else {
        // alert('Invalid email or password');
        toast.error('😠 Invalid email or password');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    
  
    navigate('/login'); 
  }


  return (
    <>
    <Header/>
    <div className="max-w-lg p-3 mx-auto flex flex-col justify-center text-center">
      <h1 className="text-center text-3xl font-semibold">SIGN IN</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 mt-7"
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
        <input
          type="text"
          placeholder="Enter your mobile number"
          id="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 mt-5"
          required
        />
        <button className="bg-red-500 p-3 rounded-lg text-white" type="submit">
          SIGN IN
        </button>
      </form>
      <div className="flex gap-5 mt-2">
        <p>Don't have an account?</p>
        <Link to="/register">
          <span className="text-red-500 font-semibold">Register</span>
        </Link>
      </div>
    </div></>
  );
};

export default Login;
