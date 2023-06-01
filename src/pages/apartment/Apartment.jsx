import React from "react";
import './apartment.scss';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Container from "../../components/explore/container/Container";

export default function Apartment(){
    return(
        <>
            <Header/>
            <Container isLoaded={true} type="Apartment"/>
            <Footer/>
        </>
    )
}