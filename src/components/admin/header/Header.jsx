import React, { useState, useEffect } from "react";
import "./header.scss";
import { HiUser, HiMenu, HiX, HiChevronDown } from 'react-icons/hi';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        setDropdownOpen(false);
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
          <a href="/"><img src="../src/assets/brand/logo-transparent-small.png" alt="apart-tell logo" /></a>
        </div>
        <div className="nav-container">
          <button className="menu-button" onClick={toggleMenu}>
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
          <ul className={`nav-items ${menuOpen ? 'active' : ''}`}>
            <li><a href="/">Home</a></li>
            <li><a href='/explore'>Explore</a></li>
            <li><a href='/about'>About Us</a></li>
            <li className={`dropdown-icon ${dropdownOpen ? 'active' : ''}`} onClick={toggleDropdown}>
              <a>
                <HiUser />Welcome, user! <HiChevronDown />
              </a>
              <ul className={`dropdown-items ${dropdownOpen ? 'active' : ''}`}>
                <li><a href="/user/account">Account</a></li>
                <li><a href="/user/directory">Directory</a></li>
                <li><a href="/login">Log Out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
