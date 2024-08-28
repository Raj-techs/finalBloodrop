import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StaticPg from './pages/StaticPg';
import SingleGroup from './pages/SingleGroup';
import DetailsPage from './pages/DetailsPage';
import UserAuth from './pages/UserPg/UserAuth';
import UserStaticPg from './pages/UserPg/UserStaticPg';
import UserReq from './pages/UserPg/UserReq';
import GovstaticPg from './pages/Gov/GovstaticPg';
import DetailsGov from './components/Gov/DetailsGov';
import Home from './pages/HomePages/pages/Home';
import Header from './components/HomeComponents/components/Header';
import Profile from './pages/HomePages/pages/Profile';
import About from './pages/HomePages/pages/About';
import Login from './pages/HomePages/pages/Login';
import Register from './pages/HomePages/pages/Register';
import BloodBankRegister from './pages/HomePages/pages/BloodBankRegister';
import BloodBankLogin from './pages/HomePages/pages/BloodBankLogin';
import AdminLogin from './pages/HomePages/pages/AdminLogin';
import AdminRegister from './pages/HomePages/pages/AdminRegister';
import { BankProvider } from './pages/HomePages/BankContext'; 
import SearchDonar from './pages/HomePages/pages/SearchDonar';
import SearchBBanks from './pages/HomePages/pages/SearchBBanks';
import SearchNearyBanks from './pages/HomePages/pages/SearchNearyBanks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DonarToggle from './pages/Togglebuton';
import TransferUserDetails from './pages/TransferUserDetails';
import NavTest from './pages/NavigationBar';
import NavigationBar from './pages/NavigationBar';


const App = () => {
  return (
    <BrowserRouter>
      <BankProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/search-donars" element={<SearchDonar />} />
          <Route path="/search-b-banks" element={<SearchBBanks />} />
          <Route path="/search-near-banks" element={<SearchNearyBanks />} />
          <Route path="/toggle" element={<DonarToggle />} />


          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/addUser' element={<StaticPg />} />
          <Route path='/singlegroup' element={<SingleGroup />} />


          <Route path='/special' element={<StaticPg />} />
          <Route path='/update' element={<StaticPg />} />
          <Route path='/details/:id' element={<DetailsPage />} />


          <Route path='/admin' element={<StaticPg />} />
          <Route path='/user/home' element={<UserStaticPg />} />
          <Route path='/user/req' element={<UserReq />} />
          <Route path='/admin/register' element={<BloodBankRegister />} />
          <Route path='/admin/login' element={<BloodBankLogin />} />
          <Route path="/admin/transferuserdetails/:id" element={<TransferUserDetails />} />



          <Route path='/gov' element={<GovstaticPg />} />
          <Route path='/gov/details/:id' element={<DetailsGov />} />
          <Route path='/gov/register' element={<AdminRegister />} />
          <Route path='/gov/login' element={<AdminLogin />} />


          <Route path='/testingnav' element={<NavigationBar />} />
        </Routes>
        <ToastContainer />
      </BankProvider>
    </BrowserRouter>
  );
}

export default App;
