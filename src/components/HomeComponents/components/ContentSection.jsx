import React from "react";
import trackImage from "../../../assests/track.jpg";
import bloodunit from "../../../assests/bloodunit.jpg";
import bImage from "../../../assests/bb.jpg";
// import '../../../App.css'


const ContentSection = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded overflow-hidden">
              <div className="w-24 h-full bg-indigo-500"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
                Features & Specifications
              </h1>
              <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0"/>
                
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
            <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src={trackImage}
                />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
              Tracking Donations
              </h2>
              <p className="text-base leading-relaxed mt-2">
              Efficiently track and manage blood donations from donors, ensuring transparency and timely updates throughout the donation process.
              </p>
              <a className="text-indigo-500 inline-flex items-center mt-3">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src={bloodunit}
                />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
              Requesting Blood Units
              </h2>
              <p className="text-base leading-relaxed mt-2">
              Streamline the process of requesting specific blood units, facilitating quick and accurate matching of donor blood types with recipient needs.
              </p>
              <a className="text-indigo-500 inline-flex items-center mt-3">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src={bImage}
                />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
              Accessing Near Blood Banks
              </h2>
              <p className="text-base leading-relaxed mt-2"/>
              Easily locate and access nearby blood banks, providing convenient access to critical blood supplies for emergency and planned medical procedures.
              <a className="text-indigo-500 inline-flex items-center mt-3">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentSection;
