import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/HomeComponents/components/Header";
import { toast } from "react-toastify";
import { Cloudinary } from "cloudinary-core";
// import '../../../App.css'

// Initialize Cloudinary instance
const cloudinaryCore = new Cloudinary({ cloud_name: "duo7jqmit" });
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

const BloodBankRegister = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [formData, setFormData] = useState({
    bankName: "",
    ParentHospitalName: "",
    password: "",
    category: "",
    firstRegistrationDate: "",
    LicenseNo: "",
    fromDate: "",
    ToDate: "",
    contactPersonEmail: "",
    contactNo: "",
    state: "",
    district: "",
    city: "",
    address: "",
    pincode: "",
    location: "",
    dp: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setFormData({ ...formData, state: state, district: "", city: "" });
    setSelectedDistrict(""); // Reset district when state changes
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setFormData({ ...formData, district: district, city: "" });
  };

  const validateMobileNumber = (number) => {
    return number.length === 10 && /^[0-9]+$/.test(number);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_upload_preset"); // Replace with your upload preset

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryCore.config().cloud_name}/image/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Uploaded Image URL:", data.secure_url);
        setFormData(prevFormData => ({ ...prevFormData, dp: data.secure_url }));
      } else {
        console.error("Cloudinary Error:", data);
        toast.error("Image upload failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFields = Object.values(formData).some(field => field === "");
    if (emptyFields) {
      toast.error("Please fill in all details!");
      return;
    }
    if (!validateMobileNumber(formData.contactNo)) {
      setErrors({ contactNo: "Please enter a valid 10-digit contact number" });
      return;
    }

    try {
      const res = await fetch("https://json-server-api-vcou.onrender.com/banks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || errors);
      }

      console.log(data);
      toast.success("Blood bank registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Registration failed! Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl p-3 mx-auto flex flex-col justify-center text-center">
        <h1 className="text-center text-3xl font-semibold">Blood Bank Sign Up</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 max-w-4xl p-5 mx-auto">
  
  {/* Blood Bank Information Section */}
  <fieldset className="border border-gray-800 shadow-lg rounded-lg p-4 col-span-full">
    <legend className="text-lg font-semibold px-2 underline mb-3 text-red-700">Blood Bank Information</legend>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      <div>
        <label htmlFor="BloodBankName" className="block text-left mb-1">Blood Bank Name</label>
        <input
          type="text"
          placeholder="Enter blood bank name"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
        />
      </div>
      <div>
        <label htmlFor="ParentHospitalName" className="block text-left mb-1">Parent Hospital Name</label>
        <input
          type="text"
          placeholder="Enter parent hospital name"
          name="ParentHospitalName"
          value={formData.ParentHospitalName}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-left mb-1">Category</label>
        <input
          type="text"
          placeholder="Enter category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
        />
      </div>
    </div>
  </fieldset>

  {/* License Information Section */}
  <fieldset className="border border-gray-800 shadow-lg rounded-lg p-4 col-span-full">
    <legend className="text-lg font-semibold px-2 underline mb-3 text-red-700">License Information</legend>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      <div>
        <label htmlFor="LicenseNo" className="block text-left mb-1">License No</label>
        <input
          type="text"
          placeholder="Enter license number"
          name="LicenseNo"
          value={formData.LicenseNo}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
        />
      </div>
      <div>
        <label htmlFor="fromDate" className="block text-left mb-1">License From Date</label>
        <input
          type="date"
          placeholder="Enter license from date"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
        />
      </div>
      <div>
        <label htmlFor="ToDate" className="block text-left mb-1">License To Date</label>
        <input
          type="date"
          placeholder="Enter license to date"
          name="ToDate"
          value={formData.ToDate}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
        />
      </div>
      <div>
        <label htmlFor="firstRegistrationDate" className="block text-left mb-1">First Registration Date</label>
        <input
          type="date"
          placeholder="Enter first registration date"
          name="firstRegistrationDate"
          value={formData.firstRegistrationDate}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
        />
      </div>
    </div>
  </fieldset>

  {/* Contact Information Section */}
  <fieldset className="border border-gray-800 shadow-lg rounded-lg p-4 col-span-full">
    <legend className="text-lg font-semibold px-2 underline mb-3 text-red-700">Contact Information</legend>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      <div>
        <label htmlFor="contactPersonEmail" className="block text-left mb-1">Contact Person Email</label>
        <input
          type="email"
          placeholder="Enter contact person email"
          name="contactPersonEmail"
          value={formData.contactPersonEmail}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
        />
      </div>
      <div>
        <label htmlFor="contactNo" className="block text-left mb-1">Contact Number</label>
        <input
          type="tel"
          placeholder="Enter contact number"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
        />
        {errors.contactNo && <p className="text-red-500 text-left">{errors.contactNo}</p>}
      </div>
    </div>
  </fieldset>

  {/* Location Details Section */}
  <fieldset className="border border-gray-800 shadow-lg rounded-lg p-4 col-span-full">
    <legend className="text-lg font-semibold px-2 underline mb-3 text-red-700">Location Details</legend>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      <div>
        <label htmlFor="state" className="block text-left mb-1">State</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleStateChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="district" className="block text-left mb-1">District</label>
        <select
          name="district"
          value={formData.district}
          onChange={handleDistrictChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
          disabled={!formData.state}
        >
          <option value="">Select District</option>
          {formData.state &&
            Object.keys(cities[formData.state]).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label htmlFor="city" className="block text-left mb-1">City</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
          disabled={!formData.district}
        >
          <option value="">Select City</option>
          {formData.district &&
            cities[formData.state][formData.district].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label htmlFor="address" className="block text-left mb-1">Address</label>
        <input
          type="text"
          placeholder="Enter address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
        />
      </div>
      <div>
        <label htmlFor="pincode" className="block text-left mb-1">Pincode</label>
        <input
          type="text"
          placeholder="Enter pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-left mb-1">Location</label>
        <input
          type="text"
          placeholder="Embed Tag"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="bg-gray-200 rounded-lg p-3 w-full"
        />
      </div>
    </div>
  </fieldset>

  {/* Upload Section */}
  <fieldset className="border border-gray-800 shadow-lg rounded-lg p-4 col-span-full">
    <legend className="text-lg font-semibold px-2 underline mb-3 text-red-700">Upload</legend>
    <div className="grid grid-cols-1 gap-x-6 gap-y-8">
      <div>
        <label htmlFor="dp" className="block text-left mb-1">Display Picture</label>
        <input
          type="file"
          name="dp"
          onChange={handleFileUpload}
          className="bg-gray-200 rounded-lg p-3 w-full"
        />
      </div>
    </div>
  </fieldset>

  <div className="col-span-full flex justify-end">
    <button
      type="submit"
      className="bg-red-700 text-white p-3 rounded-lg"
    >
      Submit
    </button>
  </div>

</form>

      </div>
    </>
  );
};

export default BloodBankRegister;
