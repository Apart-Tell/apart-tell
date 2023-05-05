import React from "react";
import "./header.scss";
import { HiUser, HiUserAdd} from 'react-icons/hi'

export default function Header_auth(){
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
                    </ul>
                {/*RESPONSIVENESS: For mobile version*/}
                </nav>
            </header>
        </div>
    );
}