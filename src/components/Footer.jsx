import React from 'react'
// import '../../src/App.css'

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="foot-divs">
            <div className="foot-div">
                <b><h4>Looing for Blood</h4></b>
                <p>Blood Availability</p>
                <p>Blood Bank Directory</p>
                <p>Thalassemia Request</p>

            </div>
            <div className="foot-div">
                <b><h4>Want to Donate Blood</h4></b>
                <p>Blood Donation Camps</p>
                <p>Donor Login</p>
                <p> About Blood Donation</p>
                <p> Register VBD Camp</p>

            </div>
            <div className="foot-div">
                <b><h4>Blood bank Login</h4></b>
                <p>APSACKS login</p>
                <p> Add your Blood Bank</p>

            </div>
            <div className="foot-div">
                <b><h4>About Us</h4></b>
                <p>About Organization</p>
                <p>Notifications</p>
                <p>Organization FAQs</p>
                <p>Gallery</p>
                <p>Video Galler</p>
                <p>Contact Us</p>
                <p>Mobile Apps</p>

            </div>
        </div>
        <div className="foot-scroll">
            <marquee className='marq' behavior="" direction="">
                <div className="inner-marq">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              
                </div>
            </marquee>
        </div>
        <div className="foot-last">
            <p>&copy; 2024-2026 by Ministry of Health and Family Welfare</p>
            <p>Terms & Conditions | Privacy Policy | Accessibility Statement | Last Updated : Jun 25 2024 | Site Map </p>
        </div>
        
      </div>
    </>
  )
}

export default Footer
