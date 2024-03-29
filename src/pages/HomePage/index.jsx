import React from "react";
import IntroSection from "./IntroSection";
import useHomePage from "../../hooks/useHomePage";
import HotProductSection from "./HotProductSection";
import DealSection from "./DealSection";
import FeaturedSection from "./FeaturedSection";
import ServiceSection from "./ServiceSection";
import GetDealSection from "./GetDealSection";
import BrandSection from "./BrandSection";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const {
    introProps,
    hotProductProps,
    dealProps,
    featuredProps,
    brands,
    serviceProps,
    getDealProps,
    loading,
  } = useHomePage();
  return (
    <main className="main">
      <IntroSection {...introProps} />
      <HotProductSection {...hotProductProps} {...loading} />
      <div className="mb-7 mb-lg-11" />
      <DealSection {...dealProps} />
      {/* brand seciton */}
      <BrandSection brands={brands} />
      {/*  brand seciton */}

      <div className="container">
        <hr className="mt-3 mb-6" />
      </div>
      <div className="container">
        <hr className="mt-5 mb-6" />
      </div>
      <FeaturedSection {...featuredProps} />
      <div className="container">
        <hr className="mt-5 mb-0" />
      </div>
      <ServiceSection serviceProps={serviceProps} />
      <GetDealSection {...getDealProps} />
    </main>
  );
};

export default HomePage;
