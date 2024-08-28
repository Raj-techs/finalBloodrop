import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../components/HomeComponents/components/Header';
import Loading from '../../../components/Loading';
// import '../../../App.css'

const states = [
    "Andhra Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", "Telangana",
    "West Bengal", "Uttar Pradesh", "Gujarat", "Rajasthan", "Punjab"
];

const cities = {
    "Andhra Pradesh": {
        Anantapur: ["Anantapur", "Bhagyanagar", "Kalyanadurg", "Rayadurg", "Peddapappur", "Bukkapatnam", "Mudigubba", "Talupula"],
        Chittoor: ["Chittoor", "Tirupati", "Nagari", "Palamaner", "Kuppam", "Vellore", "Srikalahasti", "Punganur"],
        "East Godavari": ["Kakinada", "Rajahmundry", "Peddaganjam", "Kothapeta", "Kakinada Rural", "Ramachandrapuram", "Malkipuram", "Tuni"],
        Guntur: ["Guntur", "Tenali", "Mangalagiri", "Narasaropet", "Bapatla", "Chilakaluripet", "Ponnur", "Krosuru"],
        Krishna: ["Vijayawada", "Gudiwada", "Machilipatnam", "Nuzvid", "Jaggaiahpet", "Vuyyuru", "Chandarlapadu", "Kanchikacharla"],
        Kurnool: ["Kurnool", "Nandyal", "Adoni", "Kadapa", "Yemmiganur", "Peddha Yerragunta", "Bandi Atmakur", "Gadwal"],
        Nellore: ["Nellore", "Naidupet", "Sangam", "Venkatagiri", "Rudravaram", "Kondapuram", "Udayagiri", "Allur"],
        Prakasam: ["Ongole", "Chirala", "Yerragondapalem", "Bapatla", "Kandukur", "Darsi", "Markapur", "Santhapet"],
        "Sri Potti Sreeramulu Nellore": ["Nellore", "Kakutur", "Udayagiri", "Nellore Rural", "Nellore Urban", "Peddaganjam", "Ananthasagaram", "Satyavedu"],
        Srikakulam: ["Srikakulam", "Palasa", "Tekkali", "Amadalavalasa", "Nandigam", "Hiramandalam", "Srikakulam Rural", "Etcherla"],
        Visakhapatnam: ["Visakhapatnam", "Anakapalle", "Narsipatnam", "Vizag", "Maddilapalem", "Chintapalle", "Parawada", "Pendurthi"],
        Vizianagaram: ["Vizianagaram", "Bobbili", "Pusapatirega", "Parvathipuram", "Nellimarla", "Jami", "S.Kota", "Gajapathinagaram"],
        "West Godavari": ["Tanuku", "Eluru", "Bhimavaram", "Tadepalligudem", "Nidadavole", "Palakollu", "Attili", "Dwaraka Tirumala", "Kovvur"],
        Warrangal: ["Warangal", "Hanamkonda", "Kazipet", "Kazipet", "Peddapalli", "Jangaon", "Narsampet", "Mahabubabad"],
    },
    "Maharashtra": {
        "Mumbai": ["Mumbai", "Thane", "Navi Mumbai"],
        "Pune": ["Pune", "Pimpri-Chinchwad", "Hadapsar"],
        // Add other districts for Maharashtra
    },
    // Add other states and their districts
};

const SearchDonar = () => {
    const [loading, setLoading] = useState(true);
    const [apiData, setApiData] = useState([]);
    const [allocatedData, setAllocatedData] = useState([]);
    const [formData, setFormData] = useState({
        group: '',
        country: '',
        state: '',
        district: '',
        city: ''
    });

    useEffect(() => {
        axios.get('https://json-server-api-vcou.onrender.com/registered')
            .then(response => {
                setApiData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
                setLoading(false);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching with formData:', formData);
        
        const filteredData = apiData.filter(item => {
            const matchesState = item.state === formData.state;
            const matchesCity = item.city === formData.city;
            const matchesDistrict = item.district === formData.district;
            const isDonar = item.donar === 'Yes';
    
            console.log(`Checking item: ${item.id}`, {
                matchesState,
                matchesCity,
                matchesDistrict,
                isDonar,
            });
    
            return matchesState && matchesCity && matchesDistrict && isDonar;
        });
    
        console.log('Filtered Data:', filteredData);
        setAllocatedData(filteredData);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Header />
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="text-xl font-semibold mb-4">Search Voluntary Donors</div>
                    <div className="space-y-4">
                        <h4 className="flex items-center space-x-2 text-lg font-medium">
                            <i className="fa-solid fa-magnifying-glass text-xl"></i>
                            <span>Search for Donor</span>
                        </h4>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:space-x-4">
                                <div className="flex flex-col w-full sm:w-1/4">
                                    <label className="mb-1">Blood Group:</label>
                                    <select name="group" value={formData.group} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2">
                                        <option value="">Select</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                                <div className="flex flex-col w-full sm:w-1/4">
                                    <label className="mb-1">Select Country:</label>
                                    <select name="country" value={formData.country} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2">
                                        <option value="">Select</option>
                                        <option value="INDIA">INDIA</option>
                                        <option value="USA">USA</option>
                                        <option value="PAKISTAN">PAKISTAN</option>
                                        <option value="LONDON">LONDON</option>
                                        <option value="KUWAIT">KUWAIT</option>
                                        <option value="AFRICA">AFRICA</option>
                                        <option value="SINGAPORE">SINGAPORE</option>
                                        <option value="BANGLADESH">BANGLADESH</option>
                                    </select>
                                </div>
                                <div className="flex flex-col w-full sm:w-1/4">
                                    <label className="mb-1">Select State:</label>
                                    <select name="state" value={formData.state} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2">
                                        <option value="">Select</option>
                                        {states.map(state => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col w-full sm:w-1/4">
                                    <label className="mb-1">Select District:</label>
                                    <select name="district" value={formData.district} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2">
                                        <option value="">Select</option>
                                        {formData.state && Object.keys(cities[formData.state]).map(district => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col w-full sm:w-1/4">
                                    <label className="mb-1">Select City:</label>
                                    <select name="city" value={formData.city} onChange={handleInputChange} className="border border-gray-300 rounded-md p-2">
                                        <option value="">Select</option>
                                        {formData.state && formData.district && cities[formData.state][formData.district].map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                                Search
                            </button>
                        </form>
                        {allocatedData?.length > 0 && (
    <div className="w-full bg-white p-4 rounded-lg shadow-md mt-4">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Availability</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Mobile Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Report</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {allocatedData.map((item) => (
                    <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.donar === 'Yes' ? 'Available' : 'Unavailable'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.mobileNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Report</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)}

                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchDonar;
