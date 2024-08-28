import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import axios from 'axios'


const Status = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [error, setError] = useState(null);


    useEffect(_ => {


        const email = localStorage.getItem('email');

        // Fetch user details from API
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('https://json-server-api-vcou.onrender.com/registered', {
                    params: {
                        email: email
                    }
                });
                const user = response.data.find(user => user.email === email);

                if (user) {
                    setUserDetails(user);
                } else {
                    setError('User not found');
                }
            } catch (err) {
                setError('Error fetching user details');
            } finally {
                setLoading(false);
            }
        };

        if (email) {
            fetchUserDetails();
        } else {
            setError('No email found in localStorage');
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    console.log(localStorage.getItem('token'));

    console.log(userDetails);
    function generateRandomString() {
        const result = Math.floor(Math.random() * 1000000000)

        return result;
    }
    const toggleDonar = async (item) => {
        const updatedDonar = item.donar === 'Yes' ? 'No' : 'Yes';

        await axios.put(`https://json-server-api-vcou.onrender.com/registered/${item.id}`, {
            ...item,
            donar: updatedDonar,
        });

        setUserDetails((prevDetails) => ({
            ...prevDetails,
            donar: updatedDonar,
        }));

        setData((prevData) =>
            prevData.map((i) => (i.id === item.id ? { ...i, donar: updatedDonar } : i))
        );
    };



    return (
        <>
            {userDetails && <div className="container hhh">
                <div className="my-status">
                    <b><h1 style={{ fontSize: "2em", textAlign: "center", width: "500px" }}>Blood Account</h1></b>

                    <div>
                        <div className="g">
                            <div className="g-img"></div>
                            <div className="g-matter">{userDetails.group}</div>
                        </div>
                        <div className="state-details">
                            <div className='state-adduser'>
                                <table>
                                    <h2 style={{ fontWeight: "bolder", fontSize: "1.5em", position: "absolute", top: "-50px", textAlign: "center", width: "430px" }}>My Status</h2>
                                    <tr>
                                        <th>Blood Account Id :</th>
                                        <td>{generateRandomString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Donar Name :</th>
                                        <td>{userDetails.username}</td>
                                    </tr>
                                    <tr>
                                        <th>Group :</th>
                                        <td>{userDetails.group}</td>
                                    </tr>
                                    <tr>
                                        <th>Location :</th>
                                        <td>{userDetails.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Age :</th>
                                        <td>{userDetails.age}</td>
                                    </tr>
                                    <tr>
                                        <th>Mobile No :</th>
                                        <td>{userDetails.mobileNo}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="relative">
                                <p style={{ position: "relative", top: "100px", fontSize: "2em", fontStyle: "italic" }}>"Be The Donar on Your Own"</p>
                                <Link to='/user/req'><button
                                    className="mr-5 hover:text-gray-900 cursor-pointer req-btn"
                                >
                                    REQUEST
                                </button></Link>

                            </div>
                        </div>
                    </div>
                    {userDetails && (
                        <div className="total-status" style={{ display: "flex", width: "90%", justifyContent: "space-between", height: "600px", alignItems: "center", marginTop: "20px", }}>
                            <h1 style={{ padding: "10px 20px", background: "red", color: "white", borderRadius: "20px", fontSize: "1.8em", marginLeft: "90px" }}>Total Donations: 6</h1>
                            <div style={{ display: "flex", alignItems: "center", padding: "8px", border: "1px solid black", borderRadius: "30px" }}><p>Willing to  Donate</p>  <button
                                className={`flex items-center justify-between w-24 p-2 rounded-full transition-colors 
            ${userDetails.donar === 'Yes' ? 'bg-red-500' : 'bg-gray-300'}`}
                                onClick={() => toggleDonar(userDetails)}
                            >
                                <span className={`text-white ${userDetails.donar === 'Yes' ? 'font-bold' : 'font-normal'}`}>
                                    {userDetails.donar === 'Yes' ? 'Yes' : 'No'}
                                </span>
                                <span className={`h-6 w-6 bg-white rounded-full transition-transform 
            ${userDetails.donar === 'Yes' ? 'translate-x-1' : ''}`}></span>
                            </button></div>
                        </div>
                    )}
                </div>

                <h2 style={{ fontWeight: "bolder", fontSize: "2em" }} className='familydetails'>Family Details</h2>
                <div className='family-details' style={{ height: "60vh", width: "100%" }}>
                    <table>
                        <tr className='gov-req-head'>
                            <th>Member Type </th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Mobile Number</th>
                            <th>Blood Group</th>
                            <th>Donated Units No.</th>
                            <th> Donated At</th>
                            <th>Donated Date</th>
                            <th>Donated Certificates</th>
                        </tr>
                        {/* user details  */}
                        <tr>
                            {/* <td><img src={items.img} width={60} height={60} style={{ borderRadius: "50%" }} alt="" /><p style={{ marginTop: "15px", marginLeft: "15px" }}>{items.name}</p> </td> */}
                            <td><div className="group"><i class="fa-solid fa-user" style={{ marginRight: "10px", marginTop: "20px" }}></i>Father</div></td>
                            <td><div className="group">Raju</div></td>
                            <td><div className="group">42</div></td>
                            <td><div className="group">896841515</div></td>
                            <td> <div className="mobileNo">AB+</div></td>
                            <td> <div className="mobileNo">5</div></td>
                            <td> <div className="mobileNo">Dr. Narasimha Raju Bank (Bhimavaram)</div></td>
                            <td> <div className="mobileNo">22/04/2024</div></td>
                            <td> <div className="mobileNo">1</div></td>

                            {/* <td><Link to={`/gov/details/`}><button className='btn'>More</button></Link></td> */}
                        </tr>
                        <tr>
                            {/* <td><img src={items.img} width={60} height={60} style={{ borderRadius: "50%" }} alt="" /><p style={{ marginTop: "15px", marginLeft: "15px" }}>{items.name}</p> </td> */}
                            <td><div className="group"><i class="fa-solid fa-user" style={{ marginRight: "10px", marginTop: "20px" }}></i>Mother</div></td>
                            <td><div className="group">Rani</div></td>
                            <td><div className="group">38</div></td>
                            <td><div className="group">9865841515</div></td>
                            <td> <div className="mobileNo">B+</div></td>
                            <td> <div className="mobileNo">4</div></td>
                            <td> <div className="mobileNo">ASN Bank (Bhimavaram)</div></td>
                            <td> <div className="mobileNo">18/04/2024</div></td>
                            <td> <div className="mobileNo">1</div></td>

                            {/* <td><Link to={`/gov/details/`}><button className='btn'>More</button></Link></td> */}
                        </tr>
                        <tr>
                            {/* <td><img src={items.img} width={60} height={60} style={{ borderRadius: "50%" }} alt="" /><p style={{ marginTop: "15px", marginLeft: "15px" }}>{items.name}</p> </td> */}
                            <td><div className="group"><i class="fa-solid fa-user" style={{ marginRight: "10px", marginTop: "20px" }}></i>Brother</div></td>
                            <td><div className="group">Ramesh</div></td>
                            <td><div className="group">22</div></td>
                            <td><div className="group">9866789205</div></td>
                            <td> <div className="mobileNo">B+</div></td>
                            <td> <div className="mobileNo">6</div></td>
                            <td> <div className="mobileNo">Dharani Bank (Bhimavaram)</div></td>
                            <td> <div className="mobileNo">04/04/2024</div></td>
                            <td> <div className="mobileNo">1</div></td>

                            {/* <td><Link to={`/gov/details/`}><button className='btn'>More</button></Link></td> */}
                        </tr>

                    </table>
                </div>
                <div className="donated container mx-auto p-5 rounded-lg mt-8 bg-red-200 bg-opacity-40 backdrop-blur-md">
                    <div className="donated-head text-center mb-8">
                        <h2 className="font-bold text-2xl">My Donations:</h2>
                        <h2 className="font-bold text-lg mt-2">Total Donations: <span className="no-design inline-block bg-red-600 text-white rounded-full px-3 py-1">3</span></h2>
                    </div>
                    <div className="donated-divs grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="donated-div relative overflow-hidden bg-cover bg-center h-72 rounded-lg text-white flex flex-col justify-between p-4 transform transition-transform duration-300 hover:scale-105" style={{ backgroundImage: "url('https://content.jdmagicbox.com/comp/hyderabad/85/040p7315985/catalogue/red-cross-blood-bank-vidya-nagar-hyderabad-blood-banks-z9vkxpbue8.jpg')" }}>
                            <div className="overlay absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div className="font-bold mt-4">
                                    <h2>DHARANI BLOOD</h2>
                                    <h3>BANK</h3>
                                </div>
                                <div className="font-bold mb-4">
                                    <p>Location: Tanuku</p>
                                    <p>Date: 2/6/2024</p>
                                </div>
                            </div>
                        </div>
                        <div className="donated-div relative overflow-hidden bg-cover bg-center h-72 rounded-lg text-white flex flex-col justify-between p-4 transform transition-transform duration-300 hover:scale-105" style={{ backgroundImage: "url('https://anandrishijihospital.com/wp-content/uploads/2024/01/IMG-20231226-WA0006-1024x687.jpg')" }}>
                            <div className="overlay absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div className="font-bold mt-4">
                                    <h2>CHIRANJIVI BLOOD</h2>
                                    <h3>BANK</h3>
                                </div>
                                <div className="font-bold mb-4">
                                    <p>Location: Tanuku</p>
                                    <p>Date: 2/6/2024</p>
                                </div>
                            </div>
                        </div>
                        <div className="donated-div relative overflow-hidden bg-cover bg-center h-42 rounded-lg text-white flex flex-col justify-between p-4 transform transition-transform duration-300 hover:scale-105" style={{ backgroundImage: "url('https://assets.thehansindia.com/h-upload/2020/05/02/966166-vijayasri-blood-banks.webp')" }}>
                            <div className="overlay absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div className="font-bold mt-4">
                                    <h2>ASR BLOOD</h2>
                                    <h3>BANK</h3>
                                </div>
                                <div className="font-bold mb-4">
                                    <p>Location: Tanuku</p>
                                    <p>Date: 2/6/2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="msgs">
                    Donating blood is a simple yet powerful way to make a difference in the world. Each donation can save multiple lives, providing critical support to those in need during emergencies, surgeries, and treatments for various medical conditions. The process is safe, quick, and immensely rewarding, knowing that your contribution could be a lifeline for someone else.
                </div>
              <div className="fooooter">
              <Footer />
              </div>
            </div>}

        </>
    )
}

export default Status