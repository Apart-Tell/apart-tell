import React from "react";
import './apartment.scss';
import Header from "../../../components/admin/header/Header";
import Footer from "../../../components/admin/footer/Footer";
import Admin_Container from "../../../components/admin/explore/admin_container/Admin_Container";

export default function AdminApartment(){
    return(
        <>
            <Header/>
            <Admin_Container isLoaded={true} type="Apartment"/>
            <Footer/>
        </>
    )
}