import React from "react";
import About from "./About";
import Category from "./Category";
import Customers from "./Customers";
import Footer from "./Footer";

const About2 = () => {
  return (
    <div>
      <div className="section">
        <About />
      </div>
      <div className="section">
        <Category />
      </div>
      <div className="section">
        <Customers />
      </div>
      <Footer />
    </div>
  );
};

export default About2;
