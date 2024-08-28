import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import '../../src/App.css'

const Update = (props) => {
    const [users,setUsers]=useState([])
    const [searchId,setsearchId]=useState('')
    const [filteredUser, setFilteredUser] = useState(null);

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
        if (searchId) {
            const user = users.find(user => user.id.toLowerCase() === searchId.toLowerCase());
            setFilteredUser(user || {});
        }
    }, [searchId, users]);

 
    



    const defaultDate = new Date().toISOString().slice(0, 10)
    const currentDate = new Date();
    const defaultTime = currentDate.toISOString().slice(11, 16);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        group: '',
        location: '',
        age: '',
        mobile: '',
        bankName: '',
        tablets: "",
        time: defaultTime,
        date: defaultDate,
        condition: ""
    });
    useEffect(() => {
        if (filteredUser) {
            setFormData({
                id: filteredUser.id || '',
                name: filteredUser.name || '',
                group: filteredUser.group || '',
                location: filteredUser.location || '',
                age: filteredUser.age || '',
                mobile: filteredUser.mobile || '',
                bankName: filteredUser.bankName || '',
                tablets: '',
                time: formData.time,
                date: formData.date,
                condition: ''
            });
        }
    }, [filteredUser]);

 
    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { id, ...rest } = formData;

        if (!id) {
            alert('User ID is required');
            return;
        }

        try {
            await axios.put(`https://json-server-api-vcou.onrender.com/users/${id}`, rest);
            alert('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user');
        }
    };
    return (
        <>
            <div className="adduser">
                <form onSubmit={handleSubmit} className='inner-adduser single'>
                    <h3 style={{ fontWeight: 900,fontSize:"2em" }}>UPDATE USER</h3>
                        <div>
                            User ID : <input type="text" onChange={e=>setsearchId(e.target.value)}  name="id" style={{ width: "90px" }} />
                        <div>
                            Name : <input type="text" value={formData.name || ''}  onChange={handleChange} name="name" />
                        </div>
                        </div>
                    <div>
                        <div>
                            Group : <input type="text"  value={formData.group || ''}  onChange={handleChange} name="group" />
                        </div>
                        <div>
                            Location : <input type="text" value={formData.location || ''} onChange={handleChange} name="location" />
                        </div>
                        <div>
                            Age : <input type="number" value={formData.age || ''} onChange={handleChange} name='age' />
                        </div>
                    </div>
                    <div>
                        <div>
                            Mobile NO. : <input type="text" value={formData.mobile || ''} onChange={handleChange} name="mobile" />
                        </div>
                        <div>
                            Visits on : <input type="date" name='date' value={formData.date || defaultDate} />
                        </div>
                        <div>
                            Time : <input type="time" name='time' value={formData.time || defaultTime} />
                        </div>
                    </div>


                
                    <div style={{ position: "relative" }}>
                        <div>
                            Problem: <textarea type="file" placeholder='Enter Patient Condition' rows={3} cols={55} name='condition' onChange={handleChange} value={formData.condition || ''} />
                        </div>
                        <div>
                            Tablets Issued: <textarea type="file" placeholder='Enter Tablets' rows={3} cols={50} name='tablets' onChange={handleChange}  value={formData.tablets || ''}  />
                        </div>
                        <button style={{ textAlign: "center", position: "absolute", top: "75px",left:"300px" }} type='submit'>Update</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Update
