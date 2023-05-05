import React from "react";
import Header from "../../components/header/Header";
import Option from "../../components/option/Option";
import Footer from "../../components/footer/Footer";
import './home.scss';
import Search from "../../components/search/Search";
import AppRouter from "../../AppRouter";

export default function Home(){
    return(
        <div>
            <Header/>
            <Search/>
            <Option/>
            <Footer/>
        </div>
    )
}