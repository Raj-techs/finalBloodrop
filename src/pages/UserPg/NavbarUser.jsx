import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch, faHandHoldingHeart, faMapMarkerAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logoImage from "../../assests/bloodrop.png";
import Sidebar from './NotifyUser'; // Import Sidebar component
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person'; // Import person icon
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {   faBars } from '@fortawesome/free-solid-svg-icons';
import useMediaQuery from '@mui/material/useMediaQuery'; // Import for media queries
import { useTheme } from '@mui/material/styles'; 
// import '../../App.css'

const Navbar = ({ scrollToSection, searchBloodBankRef, searchVoluntaryDonorsRef, findNearBloodBanksRef, handleSignOut }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedPerson, setSelectedPerson] = React.useState(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const people = [
    { name: 'John Doe', age: 30, gender: 'Male', location: 'New York', bloodGroup: 'A+', bloodUnits: 5 },
    { name: 'Jane Smith', age: 25, gender: 'Female', location: 'Los Angeles', bloodGroup: 'B-', bloodUnits: 2 },
    // Add more people as needed
  ];

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
    setOpen(true);
  };

  const handleConfirm = () => {
    // Handle confirm action
    setSelectedPerson(null);
  };
  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation">
    {/* Application Logo */}
    <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
      <Avatar sx={{ width: 56, height: 56 }} src="/path/to/logo.png" alt="App Logo" />
    </Box>
    <Divider />
    {/* List of People */}
    {!selectedPerson ? (
      <List>
        {people.map((person, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handlePersonClick(person)}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary={person.name}
                secondary={`Blood Group: ${person.bloodGroup} | Location: ${person.location}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    ) : (
      // Detailed View
      <Box sx={{ padding: 2 }}>
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
      <Avatar sx={{ width: 56, height: 56 }} src="/path/to/logo.png" alt="App Logo" />
    </Box>
        <Typography variant="h6" gutterBottom>
          {selectedPerson.name}
        </Typography>
        <Typography variant="body1">Age: {selectedPerson.age}</Typography>
        <Typography variant="body1">Gender: {selectedPerson.gender}</Typography>
        <Typography variant="body1">Location: {selectedPerson.location}</Typography>
        <Typography variant="body1">Blood Group: {selectedPerson.bloodGroup}</Typography>
        <Typography variant="body1">Blood Units: {selectedPerson.bloodUnits}</Typography>
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#1976d2', color: 'white' }} onClick={handleConfirm}>
            Confirm
          </Button>
        </Box>
      </Box>
    )}
  </Box>
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <>
      <nav className="body-font bg-red-800 text-white h-20 flex items-center justify-between px-4">
      <div className="flex items-center">
        <img src={logoImage} alt="Bloodrop Logo" className="w-10 h-10 p-2 bg-white rounded-full" />
        {!isSmallScreen && <span className="ml-3 text-xl">BLOODROP</span>}
      </div>

      {isSmallScreen ? (
        // Mobile View
        <div className="flex items-center">
          <Typography variant="h6" className="ml-3">{localStorage.getItem('username')}</Typography>
          <Button onClick={toggleDrawer(true)} className="text-white">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </Button>
        </div>
      ) : (
        // Desktop View
        <div className="flex items-center">
          <Badge badgeContent={2} color="error" className='hidden sm:flex sm:items-center'>
            <Button onClick={toggleDrawer(true)} startIcon={<NotificationsIcon />} className='text-white'>
              Help
            </Button>
          </Badge>

          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>

          <button onClick={() => scrollToSection(searchBloodBankRef)} className="mr-5 hover:text-red-400 ml-6  mt-3 flex items-center">
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            Search Blood Bank
          </button>
          <button onClick={() => scrollToSection(searchVoluntaryDonorsRef)} className="mr-5 hover:text-red-400 ml-6  mt-3 flex items-center">
            <FontAwesomeIcon icon={faHandHoldingHeart} className="mr-2" />
            Search Voluntary Donors
          </button>
          <button onClick={() => scrollToSection(findNearBloodBanksRef)} className="mr-5 hover:text-red-400 ml-6  mt-3 flex items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            Find Near Blood Banks
          </button>
          <button onClick={toggleSidebar} className="hover:text-red-400 ml-6  mt-3 focus:outline-none">
            <FontAwesomeIcon icon={faBell} size="lg" />
          </button>
        </div>
      )}
    </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;
