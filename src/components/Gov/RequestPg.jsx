import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import '../../../src/App.css'

const RequestPg = () => {
    const [requests,setRequests]=useState([])
    useEffect(_=>{
        axios.get("https://json-server-api-vcou.onrender.com/requests").then(res=>setRequests(res.data))
    })
    return (
        <>
            <div className="gov-req">
                <h2>Requests <div className="gov-req-count">{requests.length}</div></h2>
                <table>
                    <tr className='gov-req-head'>
                        <td>Users </td>
                        <td>Group</td>
                        <td>Units</td>
                        <td>Location</td>
                        <td>Date</td>
                        <td>Certificate No.</td>
                        <td>Mobile No</td>
                        <td>More</td>
                    </tr>
                    {/* user details  */}
                    {requests.map(items=>{
                        return(<tr>
                            {/* <td><img src={items.img} width={60} height={60} style={{ borderRadius: "50%" }} alt="" /><p style={{ marginTop: "15px", marginLeft: "15px" }}>{items.name}</p> </td> */}
                            <td><div className="group"><i class="fa-solid fa-user" style={{marginRight:"10px"}}></i>{items.username}</div></td>
                            <td><div className="group">{items.group}</div></td>
                            <td><div className="group">{items.units}</div></td>
                            <td><div className="group">{items.usrlocation}</div></td>
                            <td> <div className="mobileNo">{items.date}</div></td>
                            <td> <div className="mobileNo">{items.certificates.length}</div></td>
                            <td> <div className="mobileNo">{items.mobile}</div></td>
                           
                            <td><Link to={`/gov/details/${items.id}`}><button className='btn'>More</button></Link></td>
                        </tr>)
                    })}
                </table>
            </div >
        </>
  )
}

export default RequestPg
