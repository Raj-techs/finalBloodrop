import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPaperPlane, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingOne from '../components/LoadingOne';
import Swal from 'sweetalert2';
import axios from 'axios';
// import '../App.css'


const TransferUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://json-server-api-vcou.onrender.com/allocated/${id}`);
        setUserDetails(response.data);
        setCertificates(response.data.certificates || []); // Assuming certificates are part of userDetails
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        navigate('/error');
      }
    };

    fetchUserDetails();
  }, [id, navigate]);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = () => {
    // Add OTP verification logic here
    console.log('OTP:', otp);
    // Example: Check OTP against a predefined value or an API
    if (otp === '123456') {
      setOtpError('');
      // OTP verified, handle success
      alert('OTP Verified');
    } else {
      setOtpError('Invalid OTP');
    }
  };

  if (loading) {
    return <LoadingOne />;
  }

  if (!userDetails) {
    return <div>No user details found</div>;
  }
  const handleConfirm = () => {
    // Show SweetAlert2 popup
    Swal.fire({
      icon: 'success',
      title: 'Request Confirmed',
      text: 'Your request has been successfully confirmed!',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle the confirmation button click if needed
        navigate('/admin'); // Example navigation after confirmation
      }
    });
  };

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
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="relative">
            {/* Back Button */}
            <div className="absolute top-4 left-4">
              <Link to="/admin">
                <button className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Back
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4 mt-8">
              <div className="col-span-4 sm:col-span-3">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
                    <img src={userDetails.profilePicture || "https://randomuser.me/api/portraits/men/94.jpg"} className="w-32 h-32 bg-gray-300 rounded-full mb-4" alt="Profile Picture" />
                    <h1 className="text-2xl font-semibold mb-2">{userDetails.fromUsername || "John Doe"}</h1>
                    <p className="text-gray-600 mb-6">{userDetails.role || "Software Developer"}</p>

                    <div className="w-full bg-gray-100 p-4 rounded-lg border border-gray-200 mb-6">
                      <h2 className="text-lg font-semibold text-gray-800 mb-3">Details</h2>
                      <p className="text-gray-700 mb-2"><strong>Location:</strong> {userDetails.userLocation || "New York"}</p>
                      <p className="text-gray-700 mb-2"><strong>Blood Group:</strong> {userDetails.group || "B+"}</p>
                      <p className="text-gray-700 mb-2"><strong>Units Available:</strong> {userDetails.units || 5}</p>
                      <p className="text-gray-700"><strong>Mobile Number:</strong> {userDetails.mobile || "(123) 456-7890"}</p>
                    </div>

                    <div className="w-full bg-gray-100 p-4 rounded-lg border border-gray-200 mb-6">
                      <h2 className="text-lg font-semibold text-gray-800 mb-3">Certificates</h2>
                      <ul>
                        {certificates.length > 0 ? (
                          certificates.map((cert, index) => (
                            <li key={index} className="mb-2">
                              <a href={cert} target="_blank" rel="noopener noreferrer" className="text-red-500">
                                Certificate {index + 1}
                              </a>
                            </li>
                          ))
                        ) : (
                          <p>No certificates available.</p>
                        )}
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <a href="#" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300">Contact</a>
                    </div>
                  </div>

                  <hr className="my-6 border-t border-gray-300" />
                </div>
              </div>
              <div className="col-span-4 sm:col-span-9">
                <div className="p-6 bg-white shadow rounded-lg">
                  {/* Stepper */}
                  <div className="flex items-center justify-between relative mb-6">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center relative">
                      <div className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full mb-2">
                        <FontAwesomeIcon icon={faCheck} className="text-2xl" />
                      </div>
                      <span className="text-gray-700">Confirm</span>
                    </div>

                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-gray-300 -z-10"></div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center relative">
                      <div className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full mb-2">
                        <FontAwesomeIcon icon={faPaperPlane} className="text-2xl" />
                      </div>
                      <span className="text-gray-700">OTP Sent</span>
                    </div>

                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-gray-300 -z-10"></div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center relative">
                      <div className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full mb-2">
                        <FontAwesomeIcon icon={faLock} className="text-2xl" />
                      </div>
                      <span className="text-gray-700">OTP Confirmation</span>
                    </div>

                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-black -z-10"></div>

                    {/* Step 4 */}
                    <div className="flex flex-col items-center relative">
                      <div className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full mb-2">
                        <FontAwesomeIcon icon={faCheck} className="text-2xl" />
                      </div>
                      <span className="text-gray-700">Completed</span>
                    </div>
                  </div>

                  {/* OTP Section */}
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>
                    <input
                      type="text"
                      value={otp}
                      onChange={handleOtpChange}
                      className="border border-gray-300 p-2 rounded-lg w-full"
                      placeholder="Enter OTP"
                    />
                    {otpError && <p className="text-red-500 mt-2">{otpError}</p>}
                    <button
                      onClick={handleVerifyOtp}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-4 transition duration-300"
                    >
                      Verify OTP
                    </button>
                  </div>

                  {/* Application Status */}
                  <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Application Status</h2>
                    <p className="text-gray-700 mb-6">Your application is number : 87928 <strong></strong>.</p>

                    <a href="#" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300" onClick={handleConfirm}>Confirm</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransferUserDetails;
