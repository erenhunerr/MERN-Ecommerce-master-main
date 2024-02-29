import React from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Categories from "../components/Categories";
import NewArrival from "../components/NewArrival";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";

function Home() {

  return (
    <div>
      <Header></Header>
      <Navbar></Navbar>
      <Banner></Banner>
      <Features></Features>
      <Categories></Categories>
      <NewArrival></NewArrival>
      <Footer></Footer>
      <Copyright></Copyright>
    </div>
  );
}

export default Home;
