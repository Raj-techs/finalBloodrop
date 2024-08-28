import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './AllUsers';
// import '../../src/App.css'

const Groups = (props) => {

    const [GAplus,setGAplus]=useState([])
    const [GAneg,setGAneg]=useState([])
    const [GBneg,setGBneg]=useState([])
    const [GBplus,setGBplus]=useState([])
    const [GABplus,setGABplus]=useState([])
    const [GABneg,setGABneg]=useState([])
    const [GOplus,setGOplus]=useState([])
    const [GOneg,setGOneg]=useState([])
    
    const [users,setUsers]=useState([])
    

    const [filterUsers, setfilterUsers] = useState([]);

    // GETTING THE USERS
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

    // GETTING THE BANKUSERS
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
    const filteredBankUsers = filterUsersByBankName();
    setfilterUsers(filteredBankUsers)
    
}, [users, props.data.bankName]);

    useEffect(_=>{
        const filterAplusGroups=_=>{
            if(filterUsers.length===null){
                console.log("A+ not found");
            }else {
                return filterUsers.filter(users=>users.group === "A+")
            }
        }
        const filteredAplusGroups = filterAplusGroups();
        setGAplus(filteredAplusGroups)

        const filterAnegGroups=_=>{
            if(filterUsers.length===null){
                console.log("A- not found");
            }else {
                return filterUsers.filter(users=>users.group === "A-")
            }
        }
        const filteredAnegGroups = filterAnegGroups();
        setGAneg(filteredAnegGroups)

        const filterBnegGroups=_=>{
            if(filterUsers.length===null){
                console.log("B- not found");
            }else {
                return filterUsers.filter(users=>users.group === "B-")
            }
        }
        const filteredBnegGroups = filterBnegGroups();
        setGBneg(filteredBnegGroups)

        const filterBplusGroups=_=>{
            if(filterUsers.length===null){
                console.log("B+ not found");
            }else {
                return filterUsers.filter(users=>users.group === "B+")
            }
        }
        const filteredBplusGroups = filterBplusGroups();
        setGBplus(filteredBplusGroups)

        const filterABnegGroups=_=>{
            if(filterUsers.length===null){
                console.log("AB- not found");
            }else {
                return filterUsers.filter(users=>users.group === "AB-")
            }
        }
        const filteredABnegGroups = filterABnegGroups();
        setGABneg(filteredABnegGroups)

        const filterABplusGroups=_=>{
            if(filterUsers.length===null){
                console.log("AB+ not found");
            }else {
                return filterUsers.filter(users=>users.group === "AB+")
            }
        }
        const filteredABplusGroups = filterABplusGroups();
        setGABplus(filteredABplusGroups)
        
        const filterOnegGroups=_=>{
            if(filterUsers.length===null){
                console.log("O- not found");
            }else {
                return filterUsers.filter(users=>users.group === "O-")
            }
        }
        const filteredOnegGroups = filterOnegGroups();
        setGOneg(filteredOnegGroups)

        const filterOplusGroups=_=>{
            if(filterUsers.length===null){
                console.log("O+ not found");
            }else {
                return filterUsers.filter(users=>users.group === "O+")
            }
        }
        const filteredOplusGroups = filterOplusGroups();
        setGOplus(filteredOplusGroups)
        
    })
    return (
        <>
            <div className="groups">
                <div className="outer-scroll">
                    <ul style={{marginTop:"150px"}}>
                        <li>
                            <div className="simg"></div>
                            <h1 style={{zIndex:2,color:"white",marginTop:"40px",fontSize:"2em"}}>A+</h1>
                            <div className='separate'>
                                <div className="active"><h5>Active</h5><p>{GAplus.length>0 ? GAplus.length : "0"}</p></div>
                                <div className="expire"><h5>Expired</h5><p>0</p></div>
                            </div>
                        </li>

                        <li>
                        <div className="simg"></div>
                            <h1 style={{zIndex:2,color:"white",marginTop:"40px",fontSize:"2em"}}>A-</h1>
                            <div className='separate'>
                                <div className="active"><h5>Active</h5><p>{GAneg.length>0?GAneg.length : '0' }</p></div>
                                <div className="expire"><h5>Expired</h5><p>0</p></div>
                            </div>
                        </li>
                        <li>
                        <div className="simg"></div>
                            <h1 style={{zIndex:2,color:"white",marginTop:"40px",fontSize:"2em"}}>B+</h1>
                            <div className='separate'>
                                <div className="active"><h5>Active</h5><p>{GBplus.length>0?GBplus.length : '0' }</p></div>
                                <div className="expire"><h5>Expired</h5><p>0</p></div>
                            </div>
                        </li>

                        <li>
                        <div className="simg"></div>
                            <h1 style={{zIndex:2,color:"white",marginTop:"40px",fontSize:"2em"}}>B-</h1>
                            <div className='separate'>
                                <div className="active"><h5>Active</h5><p>{GBneg.length>0?GBneg.length : '0' }</p></div>
                                <div className="expire"><h5>Expired</h5><p>0</p></div>
                            </div>
                        </li>




                    </ul>
                    <ul>
                        <li>
                        <div className="simg"></div>
                            <h1 style={{zIndex:2,color:"white",marginTop:"40px",fontSize:"2em"}}>AB+</h1>
                            <div className='separate'>
                                <div className="active"><h5>Active</h5><p>{GABplus.length>0?GABplus.length : '0' }</p></div>
                                <div className="expire"><h5>Expired</h5><p>0</p></div>
                            </div>
                        </li>

                        <li>
                        <div className="simg"></div>
                            <h1 style={{zIndex:2,color:"white",marginTop:"40px",fontSize:"2em"}}>AB-</h1>
                            <div className='separate'>
                                <div className="active"><h5>Active</h5><p>{GABneg.length>0?GABneg.length : '0' }</p></div>
                                <div className="expire"><h5>Expired</h5><p>0</p></div>
                            </div>
                        </li>
                        <li>
                        <div className="simg"></div>
                            <h1 style={{zIndex:2,color:"white",marginTop:"40px",fontSize:"2em"}}>O-</h1>
                            <div className='separate'>
                                <div className="active"><h5>Active</h5><p>{GOneg.length>0?GOneg.length : '0' }</p></div>
                                <div className="expire"><h5>Expired</h5><p>0</p></div>
                            </div>
                        </li>

                        <Link to='/singlegroup' style={{color:"white",textDecoration:"none"}}><li>
                        <div className="simg"></div>

                            <h1 style={{zIndex:2,color:"white",marginTop:"40px",fontSize:"2em"}}>O+</h1>
                            <div className='separate'>
                                <div className="active"><h5>Active</h5><p>{GOplus.length>0?GOplus.length : '0' }</p></div>
                                <div className="expire"><h5>Expired</h5><p>0</p></div>
                            </div>
                        </li></Link>




                    </ul>
                </div>
                <ul style={{width:"90%" ,display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                        <li className='secondary-boxs'>
                            <h1>Active
                            </h1>
                            <div className='separate middle'>
                                <div className="active" style={{fontSize:"2em"}}><p>{filterUsers.length}</p></div>
                            </div>
                        </li>

                        <li className='secondary-boxs'>
                            <h1>Expired</h1>
                            <div className='separate middle'>
                                <div className="active" style={{fontSize:"2em"}}><p>0</p></div>
                            </div>
                        </li>
                        <li className='secondary-boxs'>
                            <h1>Total</h1>
                            <div className='separate middle'>
                                <div className="active" style={{fontSize:"2em"}}><p>0</p></div>
                            </div>
                        </li>

                        <li style={{width:"70vh",height:"30vh"}}>
                            <h1>Discharged</h1>
                            <div className='separate middle'>
                                <div className="active" style={{fontSize:"2em"}}><p>0</p><button style={{padding:"5px",borderRadius:"20px",minWidth:"90px",color:"white",backgroundColor:"red"}}>+</button></div>
                            </div>
                        </li>




                    </ul>
                
                
            </div>
            
        </>
    )
}

export default Groups
