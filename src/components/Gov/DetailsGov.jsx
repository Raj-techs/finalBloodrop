import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
// import '../../../src/App.css'


import axios from 'axios';

const DetailsGov = () => {
    let { id } = useParams();
    const [reqData, setReqData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://json-server-api-vcou.onrender.com/requests");
                setReqData(res.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    let donor = reqData.find(item => item.id === id);

    const [userData, setUserData] = useState([]);

    return (
        <>
            <div className="nav">
                <div className="logo"><h1>Government</h1></div>
                <div className="opts">
                    <ul>
                        <Link to='/'><li>Home</li></Link>
                        <li>About</li>
                        <li>Services</li>
                        <li>Blog</li>
                        <li>Blood</li>
                    </ul>
                </div>
                <div className="more">
                    <ul>
                        <h5>Login</h5>
                        <h5>SignUp</h5>
                    </ul>
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : !donor ? (
                <p>No donor found</p>
            ) : (
                <div className="worker-profile">
                    <div className="worker-img">
                        <h1 style={{ position: "absolute", top: "80px", left: "10px", fontSize: "2em", fontWeight: "bolder" }}>Request</h1>
                        <i className="fa-solid fa-user" style={{ fontSize: "6em", marginBottom: "10px" }}></i>
                        <table width="300px">
                            <tbody>
                                <tr>
                                    <th>Name :</th>
                                    <td>{donor.username}</td>
                                </tr>
                                <tr>
                                    <th>Group :</th>
                                    <td>{donor.group}</td>
                                </tr>
                                <tr>
                                    <th>Units Needed :</th>
                                    <td>{donor.units}</td>
                                </tr>
                                <tr>
                                    <th>Mobile :</th>
                                    <td>{donor.mobile}</td>
                                </tr>
                                <tr>
                                    <th>Location :</th>
                                    <td>{donor.usrlocation}</td>
                                </tr>
                                <tr>
                                    <th>Certificates :</th>
                                    <td>{donor.certificates.length}</td>
                                </tr>
                                <tr>
                                    <th>Date :</th>
                                    <td>{donor.date}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="worker-work">
                        {donor.certificates.map((certificate, index) => (
                            <div key={index} id={`report-${index + 1}`}>
                                <b>Certi-{index + 1}</b>
                                <img src={certificate} alt={`Certificate ${index + 1}`} width="100%" height="100%" />
                            </div>
                        ))}
                    </div>
                    <div className="worker-cAp">
                        <h2>Visited Status</h2>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Day</th>
                                    <th>Certi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>22/6/2024</td>
                                    <td>10:20 AM</td>
                                    <td>Monday</td>
                                    <td><a href="#report-1">check</a></td>
                                </tr>
                                <tr>
                                    <td>22/6/2024</td>
                                    <td>12:00 PM</td>
                                    <td>Wednesday</td>
                                    <td><a href="#report-2">check</a></td>
                                </tr>
                                <tr>
                                    <td>22/6/2024</td>
                                    <td>3:30 PM</td>
                                    <td>Tuesday</td>
                                    <td><a href="#report-3">check</a></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="msg-box">
                            <h3>Message</h3>
                            <textarea cols="40" rows="4" placeholder='Enter msg to Patient'></textarea>
                            <button>Send</button>
                        </div>
                    </div>
                </div>
            )}
            <div style={{ height: "100vh", position: "relative", overflowY: "scroll" }}>
                <NeedAllocate reqUser={donor} />
            </div>
        </>
    );
}

const NeedAllocate = (props) => {
    const [banksData, setBanksData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [available, setAvailable] = useState(banksData);
    const [searchText, setSearchText] = useState("");

    const [bankNameToTransfer, setBankNameToTransfer] = useState("");
    const [cityNameToGet, setCityNameToGet] = useState("");
    
    const defaultDate = new Date().toISOString().slice(0, 10);
    
    const handleAllocate = async (bank) => {
        if (!props.reqUser || !props.reqUser.units) {
            console.error("Error: reqUser is missing or does not contain 'units'");
            return;
        }
    
        try {
            const data = {
                fromBank: bank.bankName,
                fromLocation: bank.location,
                fromCity: bank.city,
                fromUsername: props.reqUser.username,
                userLocation: props.reqUser.usrlocation,
                group: props.reqUser.group,
                units: props.reqUser.units,
                transferToBankName: bankNameToTransfer,
                transferCity: cityNameToGet,
                status: "processing...",
                date: defaultDate
            };
            console.log(data);
    
            await axios.post('https://json-server-api-vcou.onrender.com/allocated', data);
    
            // Show SweetAlert2 on success
            Swal.fire({
                title: 'Success!',
                text: 'Blood allocated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error("Error allocating data", error);
        }
    };
    
   
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const banks = await axios.get("https://json-server-api-vcou.onrender.com/banks");
                const users = await axios.get("https://json-server-api-vcou.onrender.com/users");
                setBanksData(banks.data);
                setUsersData(users.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setAvailable(banksData);
    }, [banksData]);

    const filterAvailBanks = filterBank(available, searchText);

    function filterBank(available, searchKey) {
        if (!available) return [];
        return available.filter(p => p.city && p.city.toLowerCase().includes(searchKey.toLowerCase()));
    }

    const getGroupCounts = (bank) => {
        const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
        const groupCounts = bloodGroups.reduce((acc, group) => ({ ...acc, [group]: 0 }), {});

        usersData.forEach(user => {
            if (user.bankName === bank.bankName) {
                groupCounts[user.group] += 1;
            }
        });

        return groupCounts;
    }

    return (
        <>
            <div style={{ position: "relative", display: "flex", justifyContent: 'center', gap: "90px", alignItems: "center", flexDirection: "column" }}>
                <div className="allocate">
                    <b>Need to : <i>Undrajavaram, U Mandal, East Godavari District, Andhra Pradesh</i></b><br />
                   
                </div>
                <div className="allocate">
                    <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginBottom: "50px" }}>
                        <input type="text" style={{ border: "2px solid black" }} placeholder='Search for City' onChange={e => setSearchText(e.target.value)} />
                    </div>
                </div>
                <table border={1} width="1200px" style={{ textAlign: "center" }}>
                    <thead>
                        <tr>
                            <th rowSpan={2}>Bank</th>
                            <th rowSpan={2}>City</th>
                            <th rowSpan={2}>Location</th>
                            <th colSpan={8}>Blood Groups</th>
                            <th rowSpan={2}>Units</th>
                            <th rowSpan={2}>Actions</th>
                        </tr>
                        <tr>
                            <th>A+</th>
                            <th>A-</th>
                            <th>B+</th>
                            <th>B-</th>
                            <th>O+</th>
                            <th>O-</th>
                            <th>AB+</th>
                            <th>AB-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterAvailBanks.map((bank, index) => {
                            const groupCounts = getGroupCounts(bank);
                            return (
                                <tr key={index}>
                                    <td>{bank.bankName}</td>
                                    <td>{bank.city}</td>
                                    <td>{bank.address}</td>
                                    <td>{groupCounts['A+']}</td>
                                    <td>{groupCounts['A-']}</td>
                                    <td>{groupCounts['B+']}</td>
                                    <td>{groupCounts['B-']}</td>
                                    <td>{groupCounts['O+']}</td>
                                    <td>{groupCounts['O-']}</td>
                                    <td>{groupCounts['AB+']}</td>
                                    <td>{groupCounts['AB-']}</td>
                                    <td>{bank.units}</td>
                                    <td>
                                        <button onClick={() => {handleAllocate(bank)}}>Allocate</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}


export default DetailsGov;
