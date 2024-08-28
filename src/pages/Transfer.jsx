import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import '../App.css'


const Transfer = (props) => {
  const [transfer, setTransfer] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://json-server-api-vcou.onrender.com/allocated');
        setTransfer(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredTransfers = transfer.filter(item => item.fromBank === props.data.bankName);

  return (
    <div className="transfer container mx-auto p-6" style={{zIndex:"1000"}}>
      <div className="transfer-divs grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTransfers && filteredTransfers.length > 0 ? (
          filteredTransfers.map(item => (
            <div className="transfer-div flex flex-col justify-between p-6 border border-gray-200 rounded-lg shadow-lg bg-white" key={item.id}>
              <div className="transfer-content mb-4">
                <p className="mb-2 text-lg font-semibold text-gray-800">
                  <i className="fa-solid fa-user mr-2 text-gray-500"></i>{item.fromUsername}
                </p>
                <p className="mb-2 text-gray-600">
                  <i className="fa-solid fa-location-dot mr-2 text-gray-500"></i>{item.userLocation}
                </p>
                <p className="mb-2 text-gray-600">
                  Blood Units: <span className="font-medium text-gray-800">{item.units}</span>
                </p>
                <p className="mb-2 text-gray-600">
                  Blood Group: <span className="font-medium text-gray-800">{item.group}</span>
                </p>
                <p className="mb-2 text-gray-600">
                  Date: <span className="font-medium text-gray-800">{item.date}</span>
                </p>
              </div>
              <Link to={`/admin/transferuserdetails/${item.id}`}>
                <button className="details-btn self-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors" style={{zIndex:"800"}}
               >
                  Details
                </button>
              </Link>
            </div>
          ))
        ) : (
          <div className="no-transfer flex flex-col items-center justify-center py-12">
            <i className="fa-solid fa-exclamation-circle text-6xl text-red-500"></i>
            <p className="text-2xl font-bold text-red-500 mt-4">No Transfers Found</p>
          </div>
        )}
      </div>
      <div className="transfer-anim relative mt-12">
        <div className="car"></div>
        <div className="img1"></div>
        <div className="road"></div>
        <div className="img2"></div>
      </div>
    </div>
  );
}

export default Transfer;
