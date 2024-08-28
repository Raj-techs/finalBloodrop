import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Header from './HomeComponents/components/Header';
// import '../../src/App.css'

const Loading = () => {
  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  };

  return (
   <>
    <Header/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ThreeDots 
        height="80"
        width="80"
        radius="9"
        color="red"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
   </>
  );
};

export default Loading;
