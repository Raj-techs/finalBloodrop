import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
// import '../../src/App.css'

const Nav = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">BLOOD BANK</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-gray-900">
            Home
          </Link>
          <Link to="/about" className="mr-5 hover:text-gray-900">
            About
          </Link>
          <Link to="/services" className="mr-5 hover:text-gray-900">
            Services
          </Link>
          <Link to="/blog" className="mr-5 hover:text-gray-900">
            Blog
          </Link>
          <Link to="/blood" className="mr-5 hover:text-gray-900">
            Blood
          </Link>
        </nav>
        <div className="text-white md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
        {isOpen && (
          <div className="mobile-menu">
            <ul>
              <Link to="/" className="block py-2" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/about" className="block py-2" onClick={toggleMenu}>
                About
              </Link>
              <Link to="/services" className="block py-2" onClick={toggleMenu}>
                Services
              </Link>
              <Link to="/blog" className="block py-2" onClick={toggleMenu}>
                Blog
              </Link>
              <Link to="/blood" className="block py-2" onClick={toggleMenu}>
                Blood
              </Link>
            </ul>
            <ul>
              <h5 className="mt-4">{props.data.bankName}</h5>
              <button
                onClick={() => {
                  toggleMenu();
                  navigate('/');
                }}
                className="mt-2 bg-red-500 text-white py-2 px-4 rounded"
              >
                LogOut
              </button>
            </ul>
          </div>
        )}
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Button
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
      </div>
    </header>
  );
};

export default Nav;