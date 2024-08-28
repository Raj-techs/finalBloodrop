import React from "react";
import HeroSection from "../../../components/HomeComponents/components/HeroSection";
import StatisticSection from "../../../components/HomeComponents/components/StatisticSection";
import SearchSection from "../../../components/HomeComponents/components/SearchSection";
import RolesSection from "../../../components/HomeComponents/components/RolesSection";
import StepsSection from "../../../components/HomeComponents/components/StepsSection";
import ContentSection from "../../../components/HomeComponents/components/ContentSection";
import TeamSection from "../../../components/HomeComponents/components/TeamSection";
import FooterSection from "../../../components/HomeComponents/components/FooterSection";
import Header from "../../../components/HomeComponents/components/Header";
import '../../../App.css'


const Home = () => {
  return (
    <div>
      <Header/>
      <HeroSection />
      <StatisticSection />
      <SearchSection />
      <RolesSection />
      <StepsSection />
      <ContentSection />
      <TeamSection />

      <FooterSection />
    </div>
  );
};

export default Home;
