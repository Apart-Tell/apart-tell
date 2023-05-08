import React from "react";
import "./header.scss";
import { HiUser, HiUserAdd, HiMenu, HiX} from 'react-icons/hi';
import { useState } from "react";

export default function Header(){

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return(
            <header>
                <nav className="navbar container">
                    <div className="logo">
                        <a href="/"><img src="src/assets/brand/logo-transparent-small.png" alt="apart-tell logo"/></a>
                    </div>
                    <div className="nav-container">
                        <button className="menu-button" onClick={toggleMenu}>
                            {menuOpen ? <HiX /> : <HiMenu />}
                        </button>
                        <ul className={`nav-items ${menuOpen ? 'active' : ''}`}>
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
                        <li><a href='/register'><b>Register</b> <i>(as admin)</i></a></li>
                        </ul>
                    </div>
                </nav>
            </header>
    );
}