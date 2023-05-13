import React, { useState, useEffect } from "react";
import "./header.scss";
import { HiUser, HiUserAdd, HiMenu, HiX } from 'react-icons/hi';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header>
      <nav className="navbar container">
        <div className="logo">
          <a href="/"><img src="src/assets/brand/logo-transparent-small.png" alt="apart-tell logo" /></a>
        </div>
        <div className="nav-container">
          <button className="menu-button" onClick={toggleMenu}>
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
          <ul className={`nav-items ${menuOpen ? 'active' : ''}`}>
            <li><a href="/">Home</a></li>
            <li><a href='/explore'>Explore</a></li>
            <li><a href='/about'>About Us</a></li>
            <li><a href='/login'><HiUser /><b>Log In</b> <i>(as admin)</i></a></li>
            <li><a href='/register'><HiUserAdd /><b>Register</b> <i>(as admin)</i></a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
