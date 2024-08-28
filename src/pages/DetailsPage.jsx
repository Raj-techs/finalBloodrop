import React, { useEffect, useState } from 'react'
import Details from '../components/Details'
import Nav from '../components/Nav'
import Loading from '../components/Loading';
import { Link, useNavigate } from 'react-router-dom';
// import '../App.css'

const DetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  
  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <>
    <div className="nav">
      
      <div className="logo" ><h1>BLOOD BANK</h1></div>
      <div className="opts">
          <ul>
              <Link to='/' style={{color:"white",textDecoration:"none"}}><li>Home</li></Link>
              <li>About</li>
              <li>Services</li>
              <li>Blog</li>
              <li>Blood</li>
          </ul>
      </div>
      <div className="more">
          <ul>
              {/* <h5 style={{marginTop:"34px"}}>{props.data.bankName}</h5> */}
              <button onClick={_=>navigate('/')}>LogOut</button>
          </ul>
      </div>
    </div>
      <Details/>
    </>
  )
}

export default DetailsPage
