import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/HomeComponents/components/Header";
import { toast } from "react-toastify";
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


const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        group: "",
        fathername: "",
        mothername: "",
        mobileNo: "",
        state: "",
        district: "",
        city: "",
        address: "",
        pincode: "",
    });

    const [errors, setErrors] = useState({});
    const [districts, setDistricts] = useState([]);
    const [citiesList, setCitiesList] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));

        if (id === "state") {
            setDistricts(Object.keys(cities[value] || {}));
            setCitiesList([]); // Clear cities on state change
            setFormData((prevData) => ({
                ...prevData,
                district: "",
                city: "",
            }));
        } else if (id === "district") {
            setCitiesList(cities[formData.state][value] || []);
            setFormData((prevData) => ({
                ...prevData,
                city: "",
            }));
        }
    };

    const validateMobileNumber = (number) => {
        return number.length === 10 && /^[0-9]+$/.test(number);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emptyFields = Object.values(formData).some(field => field === "");
        if (emptyFields) {
            toast.error("Please fill in all details!");
            return;
        }

        if (!validateMobileNumber(formData.mobileNo)) {
            setErrors({ mobileNo: "Please enter a valid 10-digit mobile number" });
            return;
        }

        const dataToSubmit = {
            ...formData,
            profileImage: uploadedImage, // Include the uploaded image URL
        };

        try {
            const res = await fetch("https://json-server-api-vcou.onrender.com/registered", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSubmit),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || errors);
            }

            setFormData({
                username: "",
                email: "",
                password: "",
                age: "",
                gender: "",
                group: "",
                fathername: "",
                mothername: "",
                mobileNo: "",
                state: "",
                district: "",
                city: "",
                address: "",
                pincode: "",
            });
            setUploadedImage(""); // Clear the uploaded image URL

            toast.success("User registered successfully! 😊");
            navigate("/login");
        } catch (error) {
            toast.error("❌ User registration Failed");
            if (error.message.includes("Mobile number already exists")) {
                setErrors({
                    mobileNo: "Mobile number already exists, please use another number",
                });
            } else {
                alert(error.message);
            }
            console.error("Error:", error);
        }
    };

    const [uploadedImage, setUploadedImage] = useState(""); // State to store uploaded image URL

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]; // Assuming single file upload
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my_upload_preset");

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/duo7jqmit/image/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setUploadedImage(data.secure_url); // Store the URL in state
            toast.success("Image uploaded successfully! 😊");
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("❌ Image upload failed");
        }
    };


    return (
        <>
            <Header />
            <div className=" p-3 mx-auto flex flex-col justify-center text-center w-[100%]">
                <h1 className="text-center text-3xl  font-semibold">SIGN UP</h1>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 max-w-4xl p-2 mx-auto "
                >
                    {/* Personal Details Section */}
                    <fieldset className="border border-gray-800 shadow-lg  rounded-lg p-4 col-span-full">
                        <legend className="text-lg font-semibold px-2 relative underline mb-3 text-red-700" style={{ textAlign: "left",zIndex:"-3" }}>Personal Details</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                            <div>
                                <label htmlFor="username" className="block text-left mb-0 text-sm">Username</label>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="bg-gray-200  rounded-lg p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-left mb-0 text-sm">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-gray-200  rounded-lg p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="mobileNo" className="block text-left mb-0 text-sm">Mobile Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter your mobile number"
                                    id="mobileNo"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                    className="bg-gray-200 rounded-lg p-2 w-full"
                                />
                                {errors.mobileNo && (
                                    <p className="text-red-500 text-left">{errors.mobileNo}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-left mb-0 text-sm">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-gray-200 rounded-lg p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="age" className="block text-left mb-0 text-sm">Age</label>
                                <input
                                    type="number"
                                    placeholder="Enter your age"
                                    id="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="bg-gray-200 rounded-lg p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="block text-left mb-0 text-sm">Gender</label>
                                <input
                                    type="text"
                                    placeholder="Enter your gender"
                                    id="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="bg-gray-200 rounded-lg p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="group" className="block text-left mb-0 text-sm">Group</label>
                                <input
                                    type="text"
                                    placeholder="Enter your blood group"
                                    id="group"
                                    value={formData.group}
                                    onChange={handleChange}
                                    className="bg-gray-200 rounded-lg p-2 w-full"
                                />
                            </div>
                            
                        </div>
                    </fieldset>

                    {/* Family Details Section */}
                    <fieldset className="border border-red-800  shadow-lg   rounded-lg p-4 col-span-full" style={{boxShadow:"0px 0px 10px red"}}>
                        <legend className="text-lg font-semibold px-2 relative underline mb-3 text-red-700" style={{ textAlign: "left" }}>Family Details</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                            
                            <div>
                                <label htmlFor="fathername" className="block text-left mb-0 text-sm">Father's Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your father's name"
                                    id="fathername"
                                    value={formData.fathername}
                                    onChange={handleChange}
                                    className="bg-gray-200 rounded-lg p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="mothername" className="block text-left mb-0 text-sm">Mother's Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your mother's name"
                                    id="mothername"
                                    value={formData.mothername}
                                    onChange={handleChange}
                                    className="bg-gray-200 rounded-lg p-2 w-full"
                                />
                            </div>
                        </div>
                    </fieldset>

                    {/* Location Details Section */}
                    <fieldset className="border shadow-lg   border-gray-800 rounded-lg p-4 col-span-full mt-1">
                        <legend className="text-lg font-semibold px-2 relative underline mb-3 text-red-700 " style={{ textAlign: "left" }}>Location Details</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                            <div>
                                <label htmlFor="state" className="block text-left mb-0 text-sm">State</label>
                                <select
                                    id="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="bg-gray-200 rounded-lg p-2 w-full"
                                >
                                    <option value="">Select State</option>
                                    {states.map((state) => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="district" className="block text-left mb-0 text-sm">District</label>
                                <select
                                    id="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className="bg-gray-200 rounded-lg p-2 w-full"
                                    disabled={!formData.state}
                                >
                                    <option value="">Select District</option>
                                    {districts.map((district) => (
                                        <option key={district} value={district}>{district}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-left mb-0 text-sm">City</label>
                                <select
                                    id="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="bg-gray-200 rounded-lg p-2 w-full"
                                    disabled={!formData.district}
                                >
                                    <option value="">Select City</option>
                                    {citiesList.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-left mb-0 text-sm">Address</label>
                                <input
                                    type="text"
                                    placeholder="Enter your address"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="bg-gray-200 rounded-lg p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="pincode" className="block text-left mb-0 text-sm">Pincode</label>
                                <input
                                    type="text"
                                    placeholder="Enter your pincode"
                                    id="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    className="bg-gray-200 rounded-lg p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="profileImage" className="block text-left mb-0 text-sm">Profile Image</label>
                                <input
                                    type="file"
                                    id="profileImage"
                                    onChange={handleFileUpload}
                                    className="bg-gray-200 rounded-lg p-2 w-full"
                                />
                            </div>
                        </div>
                    </fieldset>

                    {/* Submit Section */}
                    <div className="col-span-full flex gap-5 justify-center mt-8">
                        <button type="submit" className="bg-red-500 w-[500px] text-white rounded-lg p-2">Sign Up</button>
                        <Link to="/login" className="underline text-blue-500">Already have an account? Login</Link>
                    </div>
                </form>

            </div>
        </>
    );
};

export default Register;
