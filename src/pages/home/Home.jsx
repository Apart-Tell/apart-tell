import React from "react";
import Header from "../../components/header/Header";
import Option from "../../components/option/Option";
import Footer from "../../components/footer/Footer";
import './home.scss';
import Search from "../../components/search/Search";
import Listings from "../../components/listings/Listings";

// import AppRouter from "../../AppRouter";

const Home = () =>{
    return(
        <>
        <Header/>
        <Search/>
        <Option/>
        <Listings/>
        <Footer/>
        </>
    )
}

export default Home;