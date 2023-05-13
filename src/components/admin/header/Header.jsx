import React, { useState, useEffect } from "react";
import "./header.scss";
import { HiUser, HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState("");
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        const uid = user.uid;
        const userRef = doc(collection(db, "users"), uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setAuthUser({
            uid,
            email: userData.email,
            userName: userData.userName,
            firstName: userData.firstName,
            lastName: userData.lirstName,
          });
        } else {
          setAuthUser(null);
        }
      } else setAuthUser(null);
    });
    return () => {
      listen();
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header>
      <nav className="navbar container">
        <div className="logo">
          <a href="/">
            <img
              src="../src/assets/brand/logo-transparent-small.png"
              alt="apart-tell logo"
            />
          </a>
        </div>
        <div className="nav-container">
          <button className="menu-button" onClick={toggleMenu}>
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
          <ul className={`nav-items ${menuOpen ? "active" : ""}`}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/explore">Explore</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li
              className={`dropdown-icon ${dropdownOpen ? "active" : ""}`}
              onClick={toggleDropdown}
            >
              <a>
                <HiUser />
                {authUser && authUser.userName && (
                  <>Welcome, {authUser.userName}</>
                )}

                <HiChevronDown />
              </a>
              <ul className={`dropdown-items ${dropdownOpen ? "active" : ""}`}>
                <li>
                  <a href="/user/account">Account</a>
                </li>
                <li>
                  <a href="/user/directory">Directory</a>
                </li>
                <li>
                  <a href="/login">Log Out</a>
                </li>
=======
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
