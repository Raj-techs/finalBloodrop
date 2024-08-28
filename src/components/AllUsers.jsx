import React, { createContext, useEffect, useState } from 'react'
import { UsersData } from '../data/Users'
import { Link } from 'react-router-dom'
// import '../../src/App.css'
import axios from 'axios'
export const UserContext = createContext();

const AllUsers = (props) => {
    const [users,setUsers]=useState([])
    const [filterUsers, setfilterUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://json-server-api-vcou.onrender.com/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);
    useEffect(() => {
    const filterUsersByBankName = () => {
        // Filter users based on bankName
        if (props.data.bankName.trim() === '') {
            return ; // Return all users if bankName is empty
        } else {
            return users.filter(user => user.bankName === props.data.bankName);
        }
    };
    // filterUsersByBankName();
    const filteredUsers = filterUsersByBankName();
    setfilterUsers(filteredUsers)
    console.log("filtered bank name : ",filterUsers);
}, [users, props.data.bankName]);

    // console.log(users);
    // console.log(props.data.bankName);
    // let myUsers = users.find(usr=>usr.bankName === props.data.bankName)

    return (
        <>

            {/* <UserContext.Provider value={filterUsers}> */}
            <div className='all-users' style={{marginTop:"380px"}}>
            <h1>BLOOD GROUPS... 🩸</h1>
            <div class="button-container">
                <button>A+</button>
                <button>O+</button>
                <button>B+</button>
                <button>AB+</button>
                <button>A-</button>
                <button>O-</button>
                <button>B-</button>
                <button>AB-</button>
            </div>
            <div class="form-container">
                <div class="input-box-container">
                    <div class="input-box">
                        <div class="input-container">
                            <label for="name">Enter Name:</label>
                            <input type="text" id="name" placeholder="Name" />
                        </div>
                    </div>
                    <div class="input-box">
                        <div class="input-container">
                            <label for="location">Enter Location:</label>
                            <input type="text" id="location" name="location" placeholder="Enter a location..." />
                        </div>
                    </div>
                    <div class="input-box">
                        <div class="input-container">
                            <label for="age">Enter Age:</label>
                            <input type="number" id="age" placeholder="Age" />
                        </div>
                    </div>
                </div>
                <button id="submit" style={{marginBottom:"20px"}}>submit</button>
            </div>
            <table style={{width:"100%"}}>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Group</th>
                <th>Age</th>
                <th>Location</th>
                <th>Mobile No</th>
                <th>More</th>
                </tr>
                {filterUsers.map(items=>{
                    return(<tr >
                        <td className="group">{items.id}</td>
                        <td ><i class="fa-solid fa-user m-0"></i>
                            <p>{items.name}</p></td>
                        <td className="group">{items.group}</td>
                        <td className="group">{items.age}</td>
                        <td className="group">{items.location}</td>
                        <td className="mobileNo">{items.mobile}</td>
                        <td><Link to={`/details/${items.id}`} style={{color:"white",textDecoration:"none"}}><button className='btn'>Details</button></Link></td>
                    </tr>)
                })}
            </table>
            
            </div>
            {/* </UserContext.Provider> */}
        </>
    )
}

export default AllUsers
