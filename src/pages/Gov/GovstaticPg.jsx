import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Dashboard from '../../components/Gov/Dashboard';
import RequestPg from '../../components/Gov/RequestPg';
import Details from '../../components/Gov/DetailsGov';
import DetailsGov from '../../components/Gov/DetailsGov';
import Transfer from '../../components/Gov/Transfer';
import Rejected from '../../components/Gov/Rejected';
import TotalBanks from '../../components/Gov/TotalBanks';
import Loading from '../../components/Loading';
import Navbar from './GovNav'
// import '../../App.css'


const GovstaticPg = () => {
    const [showDashboard, setshowDashboard] = useState(true);
    const [loading, setLoading] = useState(true);

  
  const [showDetailsGov, setshowDetailsGov] = useState(false);
  const [showRequestPg, setshowRequestPg] = useState(false);
  const [showTransfer, setshowTransfer] = useState(false);
  const [showSpecial, setShowSpecial] = useState(false);
  const [showRejected, setshowRejected] = useState(false);
  const [showBanks, setshowBanks] = useState(false);

  
  const [activeOption, setActiveOption] = useState('Dashboard');

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };
  
  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar/>


      <div className="content">
      {/* <NavGov/> */}
        <div className="aside">
            <ul>
            <li className={`aside-opts ${activeOption === 'Dashboard' ? 'active' : ''}`}
              onClick={() => {handleOptionClick('Dashboard')
              setshowDashboard(true);
              setshowRequestPg(false);
              setshowTransfer(false);
              setShowSpecial(false);
              setshowDetailsGov(false);
              setshowBanks(false)
              setshowRejected(false)

            }}>Dashboard</li>
              <li className={`aside-opts ${activeOption === 'Requests' ? 'active' : ''}`}
              onClick={() => {handleOptionClick('Requests')
                setshowDashboard(false);
                setshowRequestPg(true);
                setshowTransfer(false);
              setshowBanks(false)
              setShowSpecial(false);
                setshowDetailsGov(false);
                setshowRejected(false)
              }}>Requests</li>
            <li className={`aside-opts ${activeOption === 'Transfer' ? 'active' : ''}`}
              onClick={() => {handleOptionClick('Transfer')
              setshowDashboard(false);
              setshowRequestPg(false);
              setshowBanks(false)
              setshowTransfer(true);
              setShowSpecial(false);
              setshowDetailsGov(false);
              setshowRejected(false)
            }}>Transfer</li>
            <li className={`aside-opts ${activeOption === 'Rejected' ? 'active' : ''}`}
              onClick={() => {handleOptionClick('Rejected')
              setshowDashboard(false);
              setshowRequestPg(false);
              setshowTransfer(false);
              setShowSpecial(false);
              setshowDetailsGov(false);
              setshowBanks(false)
              setshowRejected(true)
            }}>Rejected</li>
            <li className={`aside-opts ${activeOption === 'banks' ? 'active' : ''}`}
              onClick={() => {handleOptionClick('banks')
              setshowDashboard(false);
              setshowRequestPg(false);
              setshowTransfer(false);
              setShowSpecial(false);
              setshowBanks(true)
              setshowDetailsGov(false);
              setshowRejected(false)
            }}>Banks</li>
            
            </ul>
        </div>
        <div className="matter">
          {showDashboard ? <Dashboard/> : null}
          {showRequestPg ? <RequestPg/> : null}
          {showDetailsGov ? <DetailsGov/>  : null}
          {showTransfer ?<Transfer/>: null}
          {showRejected ? <Rejected/>: null}
          {showBanks ? <TotalBanks/> : null}
                
        
        </div>
      </div>
    </>
  )
}

export default GovstaticPg
