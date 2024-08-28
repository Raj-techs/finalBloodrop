import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/HomeComponents/components/Header";
import axios from "axios";
import { BankProvider, useBank } from "../BankContext";
import { toast } from "react-toastify";
// import '../../../App.css'


const Login = () => {
    const [getbankName, setgetBankName] = useState('');
    const [password, setPassword] = useState('');
    const [mybank,setmybank]=useState(null)
    const { setBank } = useBank();
    
    const navigate = useNavigate();
    useEffect(() => {
        console.log('mybank updated:', mybank);

    }, [mybank]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.get(`https://json-server-api-vcou.onrender.com/banks?bankName=${getbankName}&password=${password}`);
            const allbanks = response.data;
            
            if (allbanks.length > 0) {
                const matchedBank = allbanks.find(bank => bank.bankName === getbankName && bank.password === password);
                console.log(matchedBank);

                if (matchedBank) {
                    setBank(matchedBank);
                    toast.success("Bank Logged Successfully",mybank);
                    setTimeout(() => {
                        console.log('Navigating to /admin');
                        navigate('/admin');
                      }, 0);
                } else {
                    toast.error('Invalid bank name or password');
                }
            } else {
                toast.error('Invalid bank name or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login');
        }

        console.log(mybank);
    };

console.log(mybank);

//   const handleSubmit = async (e) => {
// e.preventDefault();
// try {
//   const res = await fetch("http://localhost:4000/bloodbank/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.error || "Login failed");
//   }

//   alert("Login successful!");
//   navigate("/profile");
// } catch (error) {
//   alert(error.message);
//   console.error("Error:", error);
// }
//   };

return (
    <>
    
         <Header />
         <div className="max-w-lg p-3 mx-auto flex flex-col justify-center text-center">
             <h1 className="text-center text-3xl font-semibold">BLOOD-BANK SIGN IN</h1>
             <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                 <input
                     type="text"
                     placeholder="Enter Bank Name"
                     name="getbankName"
                     onChange={e=>setgetBankName(e.target.value)}
                     className="bg-gray-200 rounded-lg p-3 mt-7"
                     required
                 />
                 <input
                     type="password"
                     placeholder="Enter your password"
                     name="password"
                     onChange={e=>setPassword(e.target.value)}
                     className="bg-gray-200 rounded-lg p-3 mt-5"
                     required
                 />
                 {/* <input
           type="text"
           placeholder="Enter your contact number"
           id="contactNo"
           value={formData.contactNo}
           onChange={handleChange}
           className="bg-gray-200 rounded-lg p-3 mt-5"
           required
         /> */}
                 <button className="bg-red-500 p-3 rounded-lg text-white" type="submit">
                     SIGN IN
                 </button>
             </form>
             <div className="flex gap-5 mt-2">
                 <p>Don't have an account?</p>
                 <Link to="/bbregister">
                     <span className="text-red-500 font-semibold">Register</span>
                 </Link>
             </div>
         </div>        
       </>
);
};

export default Login;