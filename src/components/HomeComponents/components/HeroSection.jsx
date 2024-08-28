// import React from "react";

// import heroImage from "../assests/blood-poster-3.jpg";
// import backgroundImage from "../assests/bg-3.jpg";

// const HeroSection = () => {
//   return (
//     <div
//       className="bg-cover bg-center "
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       <section className="text-gray-600 body-font">
//         <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
//           <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
//             <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
//             Empowering Lifesaving Blood Donations
//               <br className="hidden lg:inline-block" />
//               Revolutionizing Blood Donation Management

//             </h1>
//             <p className="mb-8 leading-relaxed">
//             Donating blood is a simple, yet powerful act of kindness that can save lives. Each donation you make can help multiple patients in need of critical blood transfusions. The process is safe, quick, and can make a profound difference in your community. By donating blood, you become a hero to those facing surgeries, accidents, and chronic illnesses. Join the life-saving mission today and give the gift of life to someone in need!
//             </p>
//             <div className="flex justify-center">
//               <button className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
//                 Learn More
//               </button>
//               <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
//                 Be a Donar
//               </button>
//             </div>
//           </div>
//           <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
//             <img
//               className="object-cover object-center rounded"
//               alt="hero"
//               src={heroImage}
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HeroSection;


import React from "react";
import heroVideo from "../../../assests/blood-anime.mp4"; // Path to your video file
import backgroundImage from "../../../assests/bg-3.jpg"; // Path to your background image
// import '../../../App.css'

const HeroSection = () => {
  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Donate Blood, Save Lives
            </h1>
            <p className="mb-8 leading-relaxed">
              Your blood donation can be the lifeline someone needs. Join us in our mission to provide safe and reliable blood to those in need. Every drop counts and can make a world of difference.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
                Donate Now
              </button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <video
              className="object-cover object-center rounded"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", height: "100%" }}
            >
              <source src={heroVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
