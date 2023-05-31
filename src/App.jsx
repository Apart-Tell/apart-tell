import React, { Component } from "react";
import "./scss/main.scss";
export { Link } from 'react-router-dom';

// For routing
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Explore from "./pages/explore/Explore";
import About from "./pages/about us/About";
import Login from "./pages/login/Login";
import Register from "./pages/registration/Register";
import AdminHome from "./pages/admin/home/AdminHome";
import Account from "./pages/admin/account/Account";
import Directory from "./pages/admin/directory/Directory";
import Page1 from "./pages/admin/add_listing/page1/Page1";
import Page2 from "./pages/admin/add_listing/page2/Page2";
import Page3 from "./pages/admin/add_listing/page3/Page3";
import Page4 from "./pages/admin/add_listing/page4/Page4";
import AdminExplore from "./pages/admin/explore/AdminExplore";
import AdminAbout from "./pages/admin/about/AdminAbout";
import ViewListing from "./pages/admin/view_listing/ViewListing";
import Search_Result_Page from "./pages/admin/search_result/Search_Result_Page";
import Search_Result from "./pages/search_result/Search_Result";
import Edit_Listing from "./pages/admin/edit_listing/Edit_Listing";
import Display_Listing from "./pages/display_listing/Display_Listing";

export default function App() {
  return (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/admin-home" element={<AdminHome/>}/>
        <Route path="/admin-explore" element={<AdminExplore/>}/>
        <Route path="/admin-about" element={<AdminAbout/>}/>
        <Route path="/user/account" element={<Account/>}/>
        <Route path="/user/directory" element={<Directory/>}/>
        <Route path="/user/edit-listing" element={<Edit_Listing/>}></Route>
        <Route path="/page1" element={<Page1/>}/>
        <Route path="/page2" element={<Page2/>}/>
        <Route path="/page3" element={<Page3/>}/>
        <Route path="/page4" element={<Page4/>}/>
        <Route path="/user-display-listing/:id" element={<Display_Listing/>}/>
        <Route path="/display-listing/:id" element={<ViewListing/>}/>
        <Route path="/results" element={<Search_Result_Page/>}></Route>
        <Route path="/search-results" element={<Search_Result/>}></Route>
      </Routes>
    </Router>
  </div>
  );
}

