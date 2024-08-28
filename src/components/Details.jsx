import React, { useEffect, useState } from 'react'
import { UsersData } from '../data/Users';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import '../../src/App.css'

const Details = () => {
    let { id } = useParams()
    const [userData, setuserData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://json-server-api-vcou.onrender.com/users");
                setuserData(res.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    let user = userData.find(items => items.id === id)

    console.log(user);
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : !user ? (
                <p>No donor found</p>
            ) : (<div className="worker-profile">
                <div className="worker-img">
                    <i class="fa-solid fa-user" style={{ fontSize: "8em" }}></i>
                    <table width={"300px"}>
                        <tr>
                            <th>Name :</th>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <th>Group :</th>
                            <td>{user.group}</td>
                        </tr>
                        
                        <tr>
                            <th>Mobile :</th>
                            <td>{user.mobile}</td>
                        </tr>
                        
                      
                        
                        <tr>
                            <th>Date :</th>
                            <td>22/06/2024</td>
                        </tr>
                    </table>
                </div>

                <div className="worker-work">
                    <div id='report-1'>
                        <b >Report-1</b>
                        <img src="https://mindxsciences.com/sample-report-page-2.png" alt="" width={"100%"} height={"100%"} />

                    </div>
                    <div id='report-2'>
                        <b>Report-2</b>
                        <img src="https://cdn.flabs.in/webassets/33806e7015fbfcaff211.png" alt="" width={"100%"} />
                    </div>

                    <div id="report-3">
                        <b >Report-3</b>
                        <img src="https://www.researchgate.net/publication/351028871/figure/fig2/AS:1015026307571713@1619012538352/Typical-blood-examination-result-in-MS-Word-format-adapted-from-Bahasa-Indonesia.ppm" alt="" width={"100%"} />
                    </div>

                </div>

                <div className="worker-cAp">
                    <h2>Visited Status</h2>
                    <table border={1}>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Day</th>
                            <th>Reports</th>
                        </tr>
                        <tr>
                            <td>22/6/2024</td>
                            <td>10:20 AM</td>
                            <td>Monday</td>
                            <td><a href="#report-1">check</a></td>

                        </tr> <tr>
                            <td>22/6/2024</td>
                            <td>12:00 PM</td>
                            <td>Wednesday</td>
                            <td><a href="#report-2">check</a></td>

                        </tr> <tr>
                            <td>22/6/2024</td>
                            <td>3:30 PM</td>
                            <td>Tuesday</td>
                            <td><a href="#report-3">check</a></td>

                        </tr>
                    </table>

                    <div className="msg-box">
                        <h3>Message</h3>
                        <textarea name="" id="" cols="40" rows="4" placeholder='Enter msg to Patient'></textarea>
                        <button>Send</button>
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default Details
