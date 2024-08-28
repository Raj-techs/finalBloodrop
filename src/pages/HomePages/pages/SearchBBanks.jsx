// SearchBBanks.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../../components/HomeComponents/components/Header';
import Loading from '../../../components/Loading';
import axios from 'axios';
// import '../../../App.css'

const SearchBBanks = () => {
    const [loading, setLoading] = useState(true);
    const [allocatedData, setAllocatedData] = useState([]);

    useEffect(() => {
        axios.get('https://json-server-api-vcou.onrender.com/banks')
            .then(response => {
                setAllocatedData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Header />
            <div className="p-4">
                <h1 className="text-start text-red-600 text-3xl font-semibold mb-4">Blood Bank Availability</h1>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <div className="bg-red-600 text-white text-xl font-bold py-2 px-4 mb-4 rounded-lg">
                        Blood Bank Availability
                    </div>
                    <div className="space-y-4 mb-4">
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                            <option value="INDIA">INDIA</option>
                            <option value="USA">USA</option>
                            <option value="PAKISTAN">PAKISTAN</option>
                            <option value="LONDON">LONDON</option>
                            <option value="KUWAIT">KUWAIT</option>
                            <option value="AFRICA">AFRICA</option>
                            <option value="SINGAPORE">SINGAPORE</option>
                            <option value="BANGLADESH">BANGLADESH</option>
                        </select>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                            <option value="Red Cross Blood Bank">Red Cross Blood Bank</option>
                            <option value="LifeSaver Blood Bank">LifeSaver Blood Bank</option>
                            <option value="Hope Blood Bank">Hope Blood Bank</option>
                            <option value="Global Blood Bank">Global Blood Bank</option>
                            <option value="Unity Blood Bank">Unity Blood Bank</option>
                            <option value="Health First Blood Bank">Health First Blood Bank</option>
                            <option value="Care Blood Bank">Care Blood Bank</option>
                            <option value="LifeBlood Bank">LifeBlood Bank</option>
                        </select>
                    </div>
                    <button className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition">Submit</button>
                </div>
                <div className="mt-4">
                    <div className="flex gap-4 text-sm mb-4">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="form-checkbox" />
                            <span>Government Blood Banks</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="form-checkbox" />
                            <span>Private</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="form-checkbox" />
                            <span>Red Cross</span>
                        </label>
                    </div>
                    <div className="mb-4">
                        <input className="w-full p-2 border border-gray-300 rounded-md" type="text" placeholder="Search for Banks" />
                    </div>
                    <div style={{width:"100%",overflowX:"scroll"}} >
                        <table className="min-w-full bg-white border border-gray-300 rounded-md">
                            <thead>
                                <tr className="bg-red-600 text-white text-left">
                                    <th className="py-2 px-4">S.No</th>
                                    <th className="py-2 px-4">Blood Bank</th>
                                    <th className="py-2 px-4">City</th>
                                    <th className="py-2 px-4">Availability</th>
                                    <th className="py-2 px-4">Last Updated</th>
                                    <th className="py-2 px-4">Type</th>
                                    <th className="py-2 px-4">Mobile</th>
                                    <th className="py-2 px-4">Report</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allocatedData.map((item, index) => (
                                    <tr key={item.id} className="border-t border-gray-300">
                                        <td className="py-2 px-4">{index + 1}</td>
                                        <td className="py-2 px-4">{item.bankName}</td>
                                        <td className="py-2 px-4">{item.city}</td>
                                        <td className="py-2 px-4">Yes</td>
                                        <td className="py-2 px-4">{new Date(item.ToDate).toLocaleDateString()}</td>
                                        <td className="py-2 px-4">{item.category}</td>
                                        <td className="py-2 px-4">{item.contactNo}</td>
                                        <td className="py-2 px-4 text-blue-500 cursor-pointer">Report</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchBBanks;
