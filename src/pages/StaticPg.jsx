import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Content from '../components/Content'
import Details from '../components/Details'
import Footer from '../components/Footer'
import { useBank } from '../pages/HomePages/BankContext'; 
// import '../App.css'


const StaticPg = () => {
  const { bank } = useBank(); 
  console.log(bank);
  return (
    <>
      <Nav data={bank} />
      <Content data={bank}/>
      {/* <Details/> */}
      <Footer/>
    </>
  )
}

export default StaticPg
