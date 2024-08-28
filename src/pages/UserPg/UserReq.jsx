import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import logoImage from '../../assests/bloodrop.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import { Cloudinary } from 'cloudinary-core';
import Swal from 'sweetalert2';
// import '../../App.css'


// Initialize Cloudinary instance
const cloudinaryCore = new Cloudinary({ cloud_name: "duo7jqmit" });

const UserReq = () => {
  const [loading, setLoading] = useState(true);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  const [reqData, setReqData] = useState({
    username: "",
    group: "",
    usrlocation: "",
    units: "",
    mobile: "",
    state: "",
    date: ""
  });

  const handleChange = (e) => {
    setReqData({ ...reqData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    const imageUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my_upload_preset");

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/duo7jqmit/image/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        imageUrls.push(data.secure_url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setUploadedImages(imageUrls);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (Object.values(reqData).some(field => !field) || uploadedImages.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields and upload images',
      });
      return;
    }
  
    const requestData = { ...reqData, certificates: uploadedImages };
  
    try {
      await axios.post('https://json-server-api-vcou.onrender.com/requests', requestData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Requested Successfully',
      });
    } catch (error) {
      console.error('Error adding user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Request Not Reached',
      });
    }
  };
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <nav className="body-font bg-red-800 text-white h-20 flex items-center justify-between p-4">
        {/* Logo and Company Name */}
        <div className="flex items-center">
          <img src={logoImage} alt="Bloodrop Logo" className="w-10 h-10 p-2  bg-white rounded-full" />
          <span className="ml-3 text-sm  sm:text-xl">BLOODROP</span>
        </div>

        {/* 3-bar menu icon (visible on mobile view) */}
        <div className="block md:hidden">
          <button
            onClick={toggleServicesDropdown}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Menu (hidden on mobile view) */}
        <div className={`flex-grow md:flex md:items-center md:justify-end ${isServicesDropdownOpen ? 'block' : 'hidden'} md:block`}>
          <nav className="flex space-x-4 md:space-x-6">
            <Link to='/' className="hover:text-gray-900">HOME</Link>
            <button onClick={toggleServicesDropdown} className="hover:text-gray-900">
              SERVICES
            </button>
            {isServicesDropdownOpen && (
              <div className="absolute bg-white text-black right-0 mt-2 w-48 rounded-lg shadow-lg md:hidden">
                <button onClick={() => scrollToSection('searchBloodBank')} className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left">
                  Search Blood Bank
                </button>
                <button onClick={() => scrollToSection('searchVoluntaryDonors')} className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left">
                  Search Voluntary Donors
                </button>
                <button onClick={() => scrollToSection('findNearBloodBanks')} className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left">
                  Find Near Blood Banks
                </button>
              </div>
            )}
            <Link to='/user/req' className="hover:text-gray-900">REQUEST</Link>
            <a href="/about" className="hover:text-gray-900">ABOUT US</a>
          </nav>
        </div>
      </nav>

     <div className="max-w-4xl p-4 mx-auto flex flex-col justify-center text-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">REQUEST BLOOD </h1>
        <form onSubmit={submitHandler} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 p-4 mx-auto">
          {/* Input fields */}
          <div className="col-span-1">
            <input type="text" placeholder="Enter Username" name="username" value={reqData.username} onChange={handleChange} className="bg-gray-200 rounded-lg p-2 w-full text-sm sm:text-base" />
          </div>
          <div className="col-span-1">
            <input type="text" placeholder="Enter Group" name="group" value={reqData.group} onChange={handleChange} className="bg-gray-200 rounded-lg p-2 w-full text-sm sm:text-base" />
          </div>
          <div className="col-span-1">
            <input type="text" placeholder="Enter Location" name="usrlocation" value={reqData.usrlocation} onChange={handleChange} className="bg-gray-200 rounded-lg p-2 w-full text-sm sm:text-base" />
          </div>
          <div className="col-span-1">
            <input type="text" placeholder="Enter Units" name="units" value={reqData.units} onChange={handleChange} className="bg-gray-200 rounded-lg p-2 w-full text-sm sm:text-base" />
          </div>
          <div className="col-span-1">
            <input type="text" placeholder="Enter Mobile No" name="mobile" value={reqData.mobile} onChange={handleChange} className="bg-gray-200 rounded-lg p-2 w-full text-sm sm:text-base" />
          </div>
          <div className="col-span-1">
            <input type="text" placeholder="Enter State" name="state" value={reqData.state} onChange={handleChange} className="bg-gray-200 rounded-lg p-2 w-full text-sm sm:text-base" />
          </div>
          <div className="col-span-1">
            <input type="text" placeholder="Enter DD/MM/YYYY" name="date" value={reqData.date} onChange={handleChange} className="bg-gray-200 rounded-lg p-2 w-full text-sm sm:text-base" />
          </div>
          <div className="col-span-1">
            <input type="file" multiple onChange={handleFileUpload} className="bg-gray-200 rounded-lg p-2 w-full text-sm sm:text-base" />
          </div>
          <button type="submit" className="col-span-1 sm:col-span-2 md:col-span-3 bg-red-500 p-3 rounded-lg text-white mt-4 sm:mt-5">Request</button>
        </form>
      </div>
      {/* <Footer /> */}
    </>
    
  );
  
};


export default UserReq;
