import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import HeroSection from '../../../components/HeroSection/HeroSection';
import OurResources from '../../../components/OurResourcesSection/OurResourcesSection';
import Services from '../../../components/ServicesSection/ServicesSection';
import Reviews from '../../../components/ReviewSection/ReviewSection';
import Location from '../../../components/LocationSection/LocationSection';
import ReaderFooter from '../../../components/ReaderFooter/ReaderFooter';

//Rendered Home page component
const Home = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <HeroSection />
      <OurResources />
      <Services />
      <Reviews />
      <Location />
      <ReaderFooter />
    </div>
  );
};

export default Home;