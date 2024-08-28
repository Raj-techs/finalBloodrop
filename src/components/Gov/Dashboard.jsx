import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import '../../../src/App.css'
const Dashboard = () => {
    const [banks, setBanks] = useState([]);
    const [donors, setDonors] = useState([]);
    const [donorsCount, setDonorsCount] = useState(0);

    useEffect(() => {
        axios.get("https://json-server-api-vcou.onrender.com/banks")
            .then(res => setBanks(res.data))
            .catch(error => console.error("Error fetching banks:", error));

        axios.get("https://json-server-api-vcou.onrender.com/registered")
            .then(res => {
                setDonors(res.data);
                // Calculate the number of available donors
                const availableDonorsCount = res.data.filter(donor => donor.donar === 'Yes').length;
                setDonorsCount(availableDonorsCount);
            })
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    return (
        <>
            <div className="gov-dash">
                <div className="divs">
                    <i className="fa-regular fa-hospital"></i>
                    <h2>Total Banks</h2>
                    <h3>{banks.length}</h3>
                </div>
                <div className="divs">
                    <i className="fa-solid fa-person-circle-plus"></i>
                    <h2>Total Users</h2>
                    <h3>{donors.length}</h3>
                </div>
                <div className="divs">
                    <i className="fa-solid fa-hand-holding-medical"></i>
                    <h2>Donors</h2>
                    <h3>{donorsCount}</h3>
                </div>
                <div className="divs">
                    <i className="fa-regular fa-hand"></i>
                    <h2>Total Requests</h2>
                    <h3>5</h3>
                </div> 
                <div className="divs">
                    <i className="fa-regular fa-user"></i>
                    <h2>Thalassemia Cases</h2>
                    <h3>0</h3>
                </div>   
            </div>
        </>
    );
}

export default Dashboard;
