import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import LoadingBar from "../components/LoadingBar";

const DashLayout = () => {
  return (
    <div>
      <Nav />
      <LoadingBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DashLayout;
