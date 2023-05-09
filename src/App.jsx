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
        <Route path="/user/account" element={<Account/>}/>
        <Route path="/user/directory" element={<Directory/>}/>
      </Routes>
    </Router>
  </div>
  );
}

