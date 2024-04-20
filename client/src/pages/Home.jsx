import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Service from "../components/Service";

const Home = () => {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Header />
      <Hero />
      <Service />
      {/* <TopRated /> */}
    </div>
  );
};

export default Home;
