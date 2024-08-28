import React, { useState } from 'react'
import Nav from '../../components/Nav'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
// import '../../App.css'

const UserAuth = () => {
  const [data,setData]=useState({
    username:"",
    group:"",
    location:"",
    mobile:""
  })
  const navigate = useNavigate()
  const changeHandler = e=>{
    setData({...data,[e.target.name]:e.target.value})
  }

    const submitHandler = async (e) => {
      e.preventDefault();
      localStorage.setItem("person", JSON.stringify(data));
  
      try {
        const res = await axios.post("http://localhost:5000/register", data);
        alert(res.data.message); // Assuming res.data.message contains the success message
        console.log(res);
        navigate('/user/home'); // Navigate to the user home page
      } catch (error) {
        console.error("Error submitting data:", error); // Log specific errors
        alert("An error occurred. Please try again later."); // User-friendly error message
      }
    }

  
  return (
    <>
      <Nav/>
      <div className="usr-auth">
        <div className="usr-card">
          <b><h3 style={{fontSize:"3em"}}>Blood Donor Section</h3></b>
          <b><h4>- Register -</h4></b>
          <div className='inner-adduser'>
                    <div>
                        Name : <input placeholder='Enter Name' name="username" onChange={changeHandler}  className="usr-inp" type="text" />
                    </div>
                    <div>
                            Group : <input placeholder='Enter group' name='group' onChange={changeHandler}  className="usr-inp" type="text" />
                    </div>

                        <div>
                            Location : <input placeholder='Enter Location' name='location' onChange={changeHandler}  className="usr-inp" type="text" />
                        </div>
                    <div>
                            Age : <input placeholder='Enter age' name='age'  onChange={changeHandler} className="usr-inp" type="number" />
                    </div>

                        <div>
                            Mobile NO. : <input placeholder='Enter Mobile No.' name='mobile' onChange={changeHandler} className="usr-inp" type="text" />
                        </div>
                        <Link to='/user/home'><button className='usr-btn' onClick={submitHandler} style={{color:"white",textDecoration:"none"}}>Add</button></Link>
                </div>
        </div>
      </div>
    </>
  )
}

export default UserAuth
