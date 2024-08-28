// import React, { useRef } from "react";
// import Header from "../components/Header";

// const Home = () => {
//   const donorRef = useRef(null);
//   const bloodBankRef = useRef(null);
//   const adminRef = useRef(null);
//   const searchBloodBankRef = useRef(null);
//   const searchVoluntaryDonorsRef = useRef(null);
//   const findNearBloodBanksRef = useRef(null);

//   return (
//     <div>
//       <Header
//         donorRef={donorRef}
//         bloodBankRef={bloodBankRef}
//         adminRef={adminRef}
//         searchBloodBankRef={searchBloodBankRef}
//         searchVoluntaryDonorsRef={searchVoluntaryDonorsRef}
//         findNearBloodBanksRef={findNearBloodBanksRef}
//       />
//       <section ref={donorRef} className="min-h-screen bg-gray-200">
//         <h2 className="text-2xl">Donor Section</h2>
//         <p>Details about donors...</p>
//       </section>
//       <section ref={bloodBankRef} className="min-h-screen bg-gray-300">
//         <h2 className="text-2xl">Blood Bank Section</h2>
//         <p>Details about blood banks...</p>
//       </section>
//       <section ref={adminRef} className="min-h-screen bg-gray-400">
//         <h2 className="text-2xl">Admin Section</h2>
//         <p>Details about admin...</p>
//       </section>
//       <section ref={searchBloodBankRef} className="min-h-screen bg-gray-500">
//         <h2 className="text-2xl">Search Blood Bank</h2>
//         <p>Details about searching blood banks...</p>
//       </section>
//       <section ref={searchVoluntaryDonorsRef} className="min-h-screen bg-gray-600">
//         <h2 className="text-2xl">Search Voluntary Donors</h2>
//         <p>Details about searching voluntary donors...</p>
//       </section>
//       <section ref={findNearBloodBanksRef} className="min-h-screen bg-gray-700">
//         <h2 className="text-2xl">Find Near Blood Banks</h2>
//         <p>Details about finding near blood banks...</p>
//       </section>
//     </div>
//   );
// };

// export default Home;

import React, { useRef } from "react";
import Header from "../components/Header";
import '../../../App.css'


const Home = () => {
  const bloodBankRef = useRef(null);
  const adminRef = useRef(null);
  const searchBloodBankRef = useRef(null);
  const searchVoluntaryDonorsRef = useRef(null);
  const findNearBloodBanksRef = useRef(null);

  return (
    <div>
      <Header
        bloodBankRef={bloodBankRef}
        adminRef={adminRef}
        searchBloodBankRef={searchBloodBankRef}
        searchVoluntaryDonorsRef={searchVoluntaryDonorsRef}
        findNearBloodBanksRef={findNearBloodBanksRef}
      />
      <section ref={bloodBankRef} className="min-h-screen bg-gray-200">
        <h2 className="text-2xl">Blood Bank Section</h2>
        <p>Details about blood banks...</p>
      </section>
      <section ref={adminRef} className="min-h-screen bg-gray-300">
        <h2 className="text-2xl">Admin Section</h2>
        <p>Details about admin...</p>
      </section>
      <section ref={searchBloodBankRef} className="min-h-screen bg-gray-400">
        <h2 className="text-2xl">Search Blood Bank</h2>
        <p>Details about searching blood banks...</p>
      </section>
      <section
        ref={searchVoluntaryDonorsRef}
        className="min-h-screen bg-gray-500"
      >
        <h2 className="text-2xl">Search Voluntary Donors</h2>
        <p>Details about searching voluntary donors...</p>
      </section>
      <section ref={findNearBloodBanksRef} className="min-h-screen bg-gray-600">
        <h2 className="text-2xl">Find Near Blood Banks</h2>
        <p>Details about finding near blood banks...</p>
      </section>
    </div>
  );
};

export default Home;
