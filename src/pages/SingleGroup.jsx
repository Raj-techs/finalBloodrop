import React from 'react'
import Nav from '../components/Nav'
import { UsersData } from '../data/Users'
// import '../App.css'

const SingleGroup = () => {
  return (
    <>
    <Nav/>
      <div className="content">
        <div className="aside">
          <ul>
            <li onClick={() => {
              // setShowAddUser(true);
              // setShowAllUsers(false);
              // setShowUpdate(false);
              // setShowSpecial(false);
              // setShowGroups(false);
              // setShowTransfer(false)
            }}>Add User</li>
            <li onClick={() => {
              // setShowAddUser(false);
              // setShowAllUsers(false);
              // setShowUpdate(false);
              // setShowSpecial(false);
              // setShowGroups(true);
              // setShowTransfer(false)
            }}>Groups</li>
            <li onClick={() => {
              // setShowAddUser(false);
              // setShowAllUsers(true);
              // setShowUpdate(false);
              // setShowSpecial(false);
              // setShowGroups(false);
              // setShowTransfer(false)
            }}>All users</li>
            <li onClick={() => {
              // setShowAddUser(false);
              // setShowAllUsers(false);
              // setShowUpdate(false);
              // setShowSpecial(true);
              // setShowGroups(false);
              // setShowTransfer(false)
            }}>Special</li>
            <li onClick={() => {
              // setShowAddUser(false);
              // setShowAllUsers(false);
              // setShowUpdate(true);
              // setShowSpecial(false);
              // setShowGroups(false);
              // setShowTransfer(false)
            }}>Update</li>
            <li onClick={() => {
              // setShowAddUser(false);
              // setShowAllUsers(false);
              // setShowUpdate(false);
              // setShowSpecial(false);
              // setShowGroups(false);
              // setShowTransfer(true)
            }}>Transfer</li>
          </ul>
        </div>
        <div className="matter">
        <div >

<div className="singleG-head">
  <div className="singlebox">
    <h1 style={{ margin: "10px" }}>O+</h1>
  </div>
  <ul>
    <li>Donars List</li>
    <li>days <input type="text" style={{ height: "20px" }} /></li>
    <li>Active : 15</li>
    <li>Expired : 3</li>
  </ul>
</div>
<div className="singleG-body">
  <div className="singleG-scroll">
    <div className="usr">
      {UsersData.map(items => {
        return (<div>
          <div><img src={items.img} width={60} height={60} style={{ borderRadius: "50%" }} alt="" />
            <p style={{ marginTop: "15px", marginLeft: "15px" }}>{items.name}</p></div>
          <div className="group">{items.group}</div>
          <div className="mobileNo">{items.mobileNo}</div>
          <button className='btn'>Details</button>
        </div>)
      })}
    </div>
  </div>
</div>
</div>

        </div>
      </div>
      
    </>
  )
}

export default SingleGroup
