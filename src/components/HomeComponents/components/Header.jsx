

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../../assests/bloodrop.png";
import { toast } from 'react-toastify';
import '../../../App.css'


const Header = ({
  bloodBankRef,
  adminRef,
  searchBloodBankRef,
  searchVoluntaryDonorsRef,
  findNearBloodBanksRef,
}) => {
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
  const [isSigninDropdownOpen, setIsSigninDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // const scrollToSection = (ref) => {
  //   ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  // };

  const toggleSignupDropdown = () => {
    setIsSignupDropdownOpen(!isSignupDropdownOpen);
  };

  const toggleSigninDropdown = () => {
    setIsSigninDropdownOpen(!isSigninDropdownOpen);
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };
  const notify = () => {
    toast.success("This is a success message!");
    // You can also use toast.error, toast.info, etc.
};

  return (
    <nav className="body-font bg-red-800 text-white h-20  ">
      {/* <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"> */}
        <div className="flex title-font font-medium items-center text-white mb-4 md:mb-0 navbar">
          <img
            src={logoImage}
            alt="Bloodrop Logo"
            className="w-10 h-10 p-2 bg-white rounded-full"
          />
          <span className="ml-3 text-sm">BLOODROP</span>
        </div>
        <div id="lts " className="hidden sm:block">
          <nav className="opts h-14  " >
          <a href="/" className="mr-5  hover:text-gray-900" onClick={notify}>
            HOME
          </a>
          

          <div className="relative " >
            <button
              onClick={toggleServicesDropdown}
              className="mr-5 hover:text-gray-900 cursor-pointer"
              style={{zIndex:"100"}}
            >
              SERVICES
            </button>
            {isServicesDropdownOpen && (
              <div className="absolute bg-white text-black right-0 mt-2 w-48 rounded-lg shadow-lg">
                <button
                  onClick={() => {
                    // scrollToSection(searchBloodBankRef);
                    setIsServicesDropdownOpen(false);
                    navigate("/search-b-banks")

                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                >
                  Search Blood Bank
                </button>
                <button
                  onClick={() => {
                    // scrollToSection(searchVoluntaryDonorsRef);
                    setIsServicesDropdownOpen(false);
                    navigate("/search-donars")
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                >
                  Search Voluntary Donors
                </button>
                <button
                  onClick={() => {
                    // scrollToSection(findNearBloodBanksRef);
                    setIsServicesDropdownOpen(false);
                    navigate('/search-near-banks')
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                >
                  Find Near Blood Banks
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={toggleSignupDropdown}
              className="mr-5 hover:text-gray-900 cursor-pointer"
            >
              SIGNUP
            </button>
            {isSignupDropdownOpen && (
              <div className="absolute bg-white text-black right-0 mt-2 w-48 rounded-lg shadow-lg">
                <button
                  onClick={() => {
                    navigate("/register");
                    setIsSignupDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                >
                  Blood Account SignUp
                </button>
                <button
                  onClick={() => {
                    navigate('/admin/register')
                    // scrollToSection(bloodBankRef);
                    setIsSignupDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                >
                  Blood Bank
                </button>
                <Link to='/gov/register'><button
                  onClick={() => {
                    // scrollToSection(adminRef);
                    setIsSignupDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                >
                  Admin
                </button></Link>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={toggleSigninDropdown}
              className="mr-5 hover:text-gray-900 cursor-pointer"
            >
              SIGNIN
            </button>
            {isSigninDropdownOpen && (
              <div className="absolute bg-white text-black right-0 mt-2 w-48 rounded-lg shadow-lg">
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsSigninDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                >
                  Blood Account SignIn
                </button>
                <button
                  onClick={() => {
                    navigate("/admin/login");

                    // scrollToSection(bloodBankRef);
                    setIsSigninDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                >
                  Blood Bank
                </button>
                <button
                  onClick={() => {
                    navigate("/gov/login");

                    // scrollToSection(adminRef);
                    setIsSigninDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                >
                  Admin
                </button>
              </div>
            )}
          </div>
          <a href="/about" className="mr-5 hover:text-gray-900">
            ABOUT US
          </a>
        </nav></div>
        <button className="inline-flex items-center bg-black border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Know More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      {/* </div> */}
    </nav>
  );
};

Header.propTypes = {
  bloodBankRef: PropTypes.object.isRequired,
  adminRef: PropTypes.object.isRequired,
  searchBloodBankRef: PropTypes.object.isRequired,
  searchVoluntaryDonorsRef: PropTypes.object.isRequired,
  findNearBloodBanksRef: PropTypes.object.isRequired,
};

export default Header;
