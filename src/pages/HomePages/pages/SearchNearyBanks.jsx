import React, { useEffect, useState } from 'react';
import Header from '../../../components/HomeComponents/components/Header';
import Loading from '../../../components/Loading';
// import '../../../App.css'

const districts = [
    "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna",
    "Kurnool", "Nellore", "Prakasam", "Sri Potti Sreeramulu Nellore",
    "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "Warrangal"
];

const cities = {
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
    "West Godavari": ["Tanuku","Eluru", "Bhimavaram", "Tadepalligudem", "Nidadavole", "Palakollu", "Attili", "Dwaraka Tirumala", "Kovvur"],
    Warrangal: ["Warangal", "Hanamkonda", "Kazipet", "Kazipet", "Peddapalli", "Jangaon", "Narsampet", "Mahabubabad"],
};

const SearchNearyBanks = () => {
    const [banks, setBanks] = useState([]);
    const [src, setSrc] = useState('');
    const [loading, setLoading] = useState(true);
    const [filteredBanks, setFilteredBanks] = useState([]);

    const [formData, setFormData] = useState({
        group: 'A+',
        country: 'INDIA',
        state: 'Andhra Pradesh',
        district: 'Anantapur',
        city: 'Vijayawada',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://json-server-api-vcou.onrender.com/banks');
                const data = await response.json();
                setBanks(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleBankClick = (bank) => {
        const srcMatch = bank.location.match(/src="([^"]+)"/);
        const src = srcMatch ? srcMatch[1] : null;
        setSrc(src);
    };




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const filtered = banks.filter(bank =>
            bank.city === formData.city &&
            bank.state === formData.state &&
            bank.district === formData.district
        );
        setFilteredBanks(filtered);
        console.log(filteredBanks);
    };

   

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Header />
            <div className="container mx-auto mt-0 p-5 bg-white shadow-md rounded" style={{ marginBottom: "10px", height: "130vh" }}>
                {/* Form Section */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-red-500">Search Nearby Banks</h2>
                    <form className="grid grid-cols-1 p-3 border md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
    <select
        name="group"
        value={formData.group}
        onChange={handleChange}
        className="block w-full border-gray-300 rounded p-2"
    >
        <option>Blood Group</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
    </select>

    <input
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Country"
        className="block w-full border-gray-300 rounded p-2"
    />
    <input
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
        className="block w-full border-gray-300 rounded p-2"
    />
    <select
        name="district"
        value={formData.district}
        onChange={handleChange}
        className="block w-full border-gray-300 rounded p-2"
    >
        <option>District</option>
        {districts.map(district => (
            <option key={district} value={district}>{district}</option>
        ))}
    </select>
    <select
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="block w-full border-gray-300 rounded p-2"
    >
        <option>City</option>
        {cities[formData.district]?.map(city => (
            <option key={city} value={city}>{city}</option>
        ))}
    </select>
    <div className="md:col-span-3 flex justify-center">
        <button className="btn" type="submit">Submit</button>
    </div>
</form>

                </div>

                {/* Table Section */}
                <h2 className="text-xl font-semibold mb-4  text-red-500">Allocated Blood Banks</h2>
                <div className="overflow-auto border rounded-lg">
                {filteredBanks && filteredBanks.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Bank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {filteredBanks.map((data) => (
                <tr key={data.sNo}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.bankName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button onClick={() => handleBankClick(data)} className="text-blue-500 hover:text-blue-700">View</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    // </div>
) : (
    <p>NO DATA FOUND</p>
)}

                </div>

                {/* Display Selected Bank Info */}
                {src && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold">Selected Bank Location:</h2>
                        <iframe
                            title="Bank Location"
                            src={src}
                            width="100%"
                            height="450"
                            className="mt-2"
                            style={{ border: 0 }}
                            loading="lazy"
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchNearyBanks;
