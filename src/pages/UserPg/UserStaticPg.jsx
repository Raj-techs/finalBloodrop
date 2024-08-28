import React, { useEffect, useState, useRef } from 'react';
import NavbarUser from './NavbarUser'
import { Link, useNavigate } from 'react-router-dom';
import Status from '../../components/User/Status';
import axios from 'axios';
import logoImage from "../../assests/bloodrop.png";
import PropTypes from "prop-types";
import Loading from '../../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
// import '../../App.css'


const UserStaticPg = ({
  bloodBankRef,
  adminRef,
  searchBloodBankRef,
  searchVoluntaryDonorsRef,
  findNearBloodBanksRef,
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://json-server-api-vcou.onrender.com/registered');
        setData(response.data);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <Loading />;
  }
  
  return (
    <>
       <NavbarUser/>
      <Status loggedInUserMobile={data} />
    </>
  );
};

UserStaticPg.propTypes = {
  bloodBankRef: PropTypes.object.isRequired,
  adminRef: PropTypes.object.isRequired,
  searchBloodBankRef: PropTypes.object.isRequired,
  searchVoluntaryDonorsRef: PropTypes.object.isRequired,
  findNearBloodBanksRef: PropTypes.object.isRequired,
};

export default UserStaticPg;
