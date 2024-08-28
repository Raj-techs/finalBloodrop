import React, { useState } from 'react'
import AddUser from './AddUser'
import Update from './Update'
import AllUsers from './AllUsers'
import Groups from './Groups'
import SingleGroup from '../pages/SingleGroup'
import Transfer from '../pages/Transfer'
import DisplayAdim from './DisplayAdim'
import SpecialCases from './SpecialCases'
// import '../../src/App.css'


const Content = (props) => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showSpecial, setShowSpecial] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showDisplay, setShowDisplay] = useState(true);

  const [activeOption, setActiveOption] = useState('Display');

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };
  return (
    <>
      <div className="content">
        <div className="aside">
          <ul>
            <li
              className={`aside-opts ${activeOption === 'AddUser' ? 'active' : ''}`}
              onClick={() => {
                handleOptionClick('AddUser');
                setShowAddUser(true);
                setShowAllUsers(false);
                setShowUpdate(false);
                setShowSpecial(false);
                setShowGroups(false);
                setShowTransfer(false)
                setShowDisplay(false)
              }}><span class="material-symbols-outlined aside-icon" style={{ position: "relative", top: "5px" }}>
                person_add
              </span>Add User</li>
            <li className={`aside-opts ${activeOption === 'Groups' ? 'active' : ''}`}
              onClick={() => {handleOptionClick('Groups')
              setShowAddUser(false);
              setShowAllUsers(false);
              setShowUpdate(false);
              setShowSpecial(false);
              setShowGroups(true);
              setShowDisplay(false)
              setShowTransfer(false)
            }}><span class="material-symbols-outlined aside-icon" style={{ position: "relative", top: "5px" }}>
                communities
              </span> B Groups</li>
            <li className={`aside-opts ${activeOption === 'AllUsers' ? 'active' : ''}`}
              onClick={() => {handleOptionClick('AllUsers')
              setShowAddUser(false);
              setShowAllUsers(true);
              setShowUpdate(false);
              setShowSpecial(false);
              setShowGroups(false);
              setShowDisplay(false)
              setShowTransfer(false)
            }}><i class="fa-solid fa-users aside-icon" style={{ marginRight: "15px" }}></i>All users</li>
            <li   className={`aside-opts ${activeOption === 'Special' ? 'active' : ''}`}
              onClick={() =>{ handleOptionClick('Special')
              setShowAddUser(false);
              setShowAllUsers(false);
              setShowUpdate(false);
              setShowSpecial(true);
              setShowGroups(false);
              setShowDisplay(false)
              setShowTransfer(false)
            }}><span class="material-symbols-outlined aside-icon" style={{ position: "relative", top: "5px", marginRight: "10px" }}>
                special_character
              </span> Special</li>
            <li className={`aside-opts ${activeOption === 'Update' ? 'active' : ''}`}
              onClick={() =>{ handleOptionClick('Update')
              setShowAddUser(false);
              setShowAllUsers(false);
              setShowUpdate(true);
              setShowSpecial(false);
              setShowGroups(false);
              setShowDisplay(false)
              setShowTransfer(false)
            }}><i class="fa-regular fa-pen-to-square aside-icon" style={{ marginRight: "15px" }} ></i>Update</li>
            <li  className={`aside-opts ${activeOption === 'Transfer' ? 'active' : ''}`}
              onClick={() => {handleOptionClick('Transfer')
              setShowAddUser(false);
              setShowAllUsers(false);
              setShowUpdate(false);
              setShowSpecial(false);
              setShowGroups(false);
              setShowDisplay(false)
              setShowTransfer(true)
            }}><span class="material-symbols-outlined aside-icon" style={{ position: "relative", top: "5px" }}>
                local_shipping
              </span>Transfer</li>
          </ul>
        </div>
        <div className="matter">
          {showAddUser ? <AddUser data={props.data}/> : null}
          {showAllUsers ? <AllUsers data={props.data} /> : null}
          {showGroups ? <Groups data={props.data} /> : null}
          {showUpdate ? <Update data={props.data} /> : null}
          {showTransfer ? <Transfer data={props.data}/> : null}
          {showDisplay ? <DisplayAdim /> : null}
          {showSpecial ? <SpecialCases /> : null}
          {/* {showAddUser ? <AddUser/> : null} */}
          {/* <AddUser/> */}
          {/* <Update/> */}
          {/* <Groups/> */}
          {/* <SingleGroup/> */}

          {/* <AllUsers/> */}
          {/* <div className="dis">
            </div> */}
          {/* <Transfer/> */}
        </div>
      </div>


      <style jsx>{`
        .aside-opts.active {
          background-color: #007bff;
          color: white;
        }
        .aside-opts.active .aside-icon {
          color: white;
        }
      `}</style>
    </>
  )
}

export default Content
