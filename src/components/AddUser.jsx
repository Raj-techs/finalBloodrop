import React, { StrictMode, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
// import '../../src/App.css'

const AddUser = (props) => {
    console.log(props);
    const [userData, setUserData] = useState({
        name: '',
        group: '',
        location: '',
        age: '',
        mobile: '',
        bankName:props.data.bankName
    });
    const {name,group,location,age,mobile}=userData

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);
        try {
            
            await axios.post('https://json-server-api-vcou.onrender.com/users', userData); // Replace with your JSON Server endpoint
            setUserData({
                name: '',
                group: '',
                location: '',
                age: '',
                mobile: ''
            });
            toast.success("User Added Successfully.")
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };
    return (
        <>
            <div className="adduser ">
                
                <div className='inner-adduser'>
                    <h2 style={{color:"darkred",fontWeight:"bolder"}}><u>Add User</u></h2>
                    <div className='input-div'>
                         <span>Name</span> : <input type="text" value={name} name='name'  onChange={handleChange} />
                    </div>
                    <div className='input-div'>
                             <span>Group</span> : <input type="text" value={group}name='group'  onChange={handleChange} />
                    </div>

                        <div className='input-div'>
                             <span>Location</span> : <input type="text" value={location} name='location'  onChange={handleChange} />
                        </div>
                    <div className='input-div'>
                             <span>Age</span> : <input type="number" value={age} name='age' onChange={handleChange}/>
                    </div>

                        <div className='input-div'>
                            <span> Mobile NO.</span> : <input type="text" value={mobile} name='mobile'  onChange={handleChange} />
                        </div>
                    <button onClick={handleSubmit}>Add</button>
                </div>
                {/* <div className="gif">
                    
                </div> */}
                <div className="img"></div>
            </div>
        </>
    )
}

export default AddUser
