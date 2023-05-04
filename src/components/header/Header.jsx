import React from "react";
import "./header.scss";
import { HiUser, HiUserAdd} from 'react-icons/hi'

import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function Header(){
    return(
        <div>
            <header>
                <nav className="navbar container">
                    <div className="logo">
                        <a href="/"><img src="logo-transparent-small.png" alt="apart-tell logo"/></a>
                    </div>
                <ul className="nav-items">
                    <li><a href="/">Home</a></li>
                    <li><a href='/explore'>Explore</a></li>
                    <li><a href='/about'>About Us</a></li>
                    <div className="login-icon icon">
                        <HiUser/>   
                    </div>
                    <li><a href='/login'><b>Log In</b> <i>(as admin)</i></a></li>                   
                    <div className="register-icon icon">
                        <HiUserAdd/>
                    </div>
                   <li><a href='/register'><b>Register</b><i>(as admin)</i></a></li>
                </ul>
                {/*RESPONSIVENESS: For mobile version*/}
                </nav>
            </header>
        </div>
    );
}