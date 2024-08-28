import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faHandsHelping, faBlog, faTint, faSignInAlt, faUserPlus, faBars } from '@fortawesome/free-solid-svg-icons';
// import '../../App.css'

const Navbar = () => {
  return (
    <div className="nav bg-red-800 text-white flex items-center justify-between p-4">
      {/* Logo Section */}
      <div className="logo flex-shrink-0 mt-[-15px]">
        <h1 className="text-xl font-bold">Government</h1>
      </div>
      
      {/* Navigation Links */}
      <div className="opts hidden lg:flex flex-grow justify-center align-middle mt-[-30px]">
        <ul className="flex space-x-4">
          <li className="hover:text-gray-300">
            <Link to='/' className="flex items-center space-x-1">
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </Link>
          </li>
          <li className="hover:text-gray-300">
            <Link to='/about' className="flex items-center space-x-1">
              <FontAwesomeIcon icon={faInfoCircle} />
              <span>About</span>
            </Link>
          </li>
          <li className="hover:text-gray-300">
            <Link to='/services' className="flex items-center space-x-1">
              <FontAwesomeIcon icon={faHandsHelping} />
              <span>Services</span>
            </Link>
          </li>
          <li className="hover:text-gray-300">
            <Link to='/blog' className="flex items-center space-x-1">
              <FontAwesomeIcon icon={faBlog} />
              <span>Blog</span>
            </Link>
          </li>
          <li className="hover:text-gray-300">
            <Link to='/blood' className="flex items-center space-x-1">
              <FontAwesomeIcon icon={faTint} />
              <span>Blood</span>
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Login/SignUp Section */}
      <div className="more hidden lg:flex flex-shrink-0 space-x-4 mt-[-30px]">
        <Link to='/login' className="flex items-center space-x-1 hover:text-gray-300">
          <FontAwesomeIcon icon={faSignInAlt} />
          <span>Login</span>
        </Link>
        <Link to='/signup' className="flex items-center space-x-1 hover:text-gray-300">
          <FontAwesomeIcon icon={faUserPlus} />
          <span>SignUp</span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center">
        <button className="text-white">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
