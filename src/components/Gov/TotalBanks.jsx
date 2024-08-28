import React, { useEffect, useState } from 'react'
import { UsersData } from '../../data/Users'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../Loading'
import LoadingOne from '../LoadingOne'
// import '../../../src/App.css'

const TotalBanks = () => {
  const [loading, setLoading] = useState(true);

    const [users, setUsers] = useState([]);
    const [banks,setbanks]=useState([])
    const [searchCity,setsearchCity]=useState('') 
    const [searchBloodGroup,setsearchBloodGroup]=useState('') 
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filterAvailBankss, setFilterAvailBankss] = useState(banks);
    useEffect(_=>{
        axios.get("https://json-server-api-vcou.onrender.com/banks").then(res=>setbanks(res.data))
        console.log(banks);
        axios.get('https://json-server-api-vcou.onrender.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
    },[])
    
  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingOne/>;
  }


    const filterAvailBanks = filterBank(banks,searchCity)
    const filterAvailBGroups = filterGroups(filteredUsers,searchBloodGroup)

    function filterBank(available,searchKey){
        if (!available) return [];
        return (available.filter(p => p.city && p.city.toLowerCase().includes(searchKey.toLowerCase()))
        )
    
    }
    function filterGroups(available,searchKey){
        if (!available) return [];
        return (available.filter(p => p.group && p.group.toLowerCase().includes(searchKey.toLowerCase()))
        )
    
    }
    const handleRowClick = (bankName) => {
        const filtered = users.filter(user => user.bankName === bankName);
        setFilteredUsers(filtered);
        console.log(filteredUsers);
      };
  return (
    <>
      <div className="total-banks">
        <div className="total-header">
            <button className='complete-btn'>Gov</button>
            <button className='complete-btn'>Private</button>
            <button className='complete-btn'>Red Cross</button>
        <input type="text" placeholder='Search for City' onChange={e=>setsearchCity(e.target.value)} style={{width:"170px",height:"30px",margin:"10px",border:"2px solid black"}} />
          <p>Total Banks : {filterAvailBanks.length}</p>
        </div>

        <div className="total-bank">
        <input type="text" placeholder='Search for Group'  onChange={e=>setsearchBloodGroup(e.target.value)} style={{width:"170px",height:"30px",margin:"10px",marginTop:"40px",border:"2px solid black"}} />
        <p>Total Groups : {filterAvailBGroups.length}</p>
        {filterAvailBGroups ? <table className="table table-hover" style={{ marginTop: "25px", borderRadius: "20px" }}>
  <thead>
    <tr>
      <th scope="col">User</th>
      <th scope="col">Group</th>
      <th scope="col">Age</th>
      <th scope="col">Mobile</th>
      <th scope="col">Location</th>
      <th scope="col">More</th>
    </tr>
  </thead>
  <tbody>
    {filterAvailBGroups.length === 0 ? (
      <tr>
        <td colSpan="6" style={{ textAlign: "center" }}>No Users Found</td>
      </tr>
    ) : (
      filterAvailBGroups.map((items, index) => (
        <tr key={index}>
          <td style={{ fontSize: ".6em" }}>
            <i className="fa-solid fa-user"></i>
            <p style={{ fontSize: "1.6em" }}>{items.name}</p>
          </td>
          <td className="group">{items.group}</td>
          <td className="group">{items.age}</td>
          <td className="group">{items.mobile}</td>
          <td className="group">{items.location}</td>
          <td>
            <button className="btn">Details</button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
 : <h1>No Users Found</h1>}
        </div>

        <div className="total-users">
        <table className="table" style={{ borderRadius: "20px", width: "100%" }}>
  <caption>List of Banks</caption>
  <thead>
    <tr>
      <th scope="col">Bank</th>
      <th scope="col">Location</th>
      <th scope="col">State</th>
      <th scope="col">Mobile</th>
      <th scope="col">More</th>
    </tr>
  </thead>
  <tbody>
    {filterAvailBanks.length === 0 ? (
      <tr>
        <td colSpan="5" style={{ textAlign: "center" }}>No Banks Found</td>
      </tr>
    ) : (
      filterAvailBanks.map((items, index) => (
        <tr key={index}>
          <td style={{ fontSize: ".6em" }}>
            <i className="fa-solid fa-user"></i>
            <p style={{ fontSize: "1.6em" }}>{items.bankName}</p>
          </td>
          <td className="group">{items.city}</td>
          <td className="group">{items.state}</td>
          <td className="group">{items.contactNo}</td>
          <td>
            <button className="btn" onClick={() => handleRowClick(items.bankName)}>Details</button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

        </div>
      </div>
    </>
  )
}

export default TotalBanks
