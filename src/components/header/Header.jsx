import React from "react";
import "./header.scss";
import { HiUser, HiUserAdd} from 'react-icons/hi'

export default function Header(){
    return(
        <div>
            <header>
                <nav className="navbar container">
                    <div className="logo">
                        <img src="logo-transparent-small.png" alt="apart-tell logo"/>
                    </div>
                <ul className="nav-items">
                    <li>Home</li>
                    <li>Explore</li>
                    <li>About Us</li>
                    <div className="login-icon icon">
                        <HiUser/>   
                    </div>
                    <li>Log In</li>
                    <div className="register-icon icon">
                        <HiUserAdd/>
                    </div>
                   <li>Register</li>
                </ul>
                {/*RESPONSIVENESS: For mobile version*/}
                </nav>
            </header>
        </div>
    );
}