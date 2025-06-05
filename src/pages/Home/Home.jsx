import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import AppDownload from "../AppDownload/AppDownload";

const Home = () => {
  return (
    <>
    <Header/>
    <ExploreMenu/>
    <AppDownload/>
    </>
  );
};

export default Home;
