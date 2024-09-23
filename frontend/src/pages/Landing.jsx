import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import landingImg from "../assets/landing.svg";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <>
      <Nav />

      {/* Background */}
      <div className="bg-custom-gradient" />

      <div className="container my-32 flex flex-col md:flex-row items-center justify-center">
        {/* Text Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0 md:mr-16 max-w-lg">
          <h1 className="text-3xl md:text-4xl font-medium leading-tight mb-4">
            <span className="lined inline-block">
              Job Applications Tracker,
            </span>
            <br />
            <strong className="inline-block mt-2">JOBMON</strong>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Organize your job hunt and never miss an opportunity.
            <br />
            Start now and stay on top of your career goals!
          </p>
          <Link to="/login" className="button-primary border-black border-2">
            Get Started
            <FaArrowRight className="ml-2" />
          </Link>
        </div>

        {/* Image Section */}
        <div className="text-center">
          <img
            src={landingImg}
            className="mx-auto w-full max-w-xs md:max-w-lg"
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Landing;
