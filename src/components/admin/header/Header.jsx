import React, { useState, useEffect } from "react";
import "./header.scss";
import { HiUser, HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { auth, db } from "../../../firebase";
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      navigate("/login"); // Replace "/" with the appropriate landing page URL
      alert("Logging out..");
    })
    .catch((error) => {
      console.log("Error occurred while logging out:", error);
    });
  }

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

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = doc(collection(db, "users"), uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setAuthUser({
            uid,
            userName: userData.userName,
          });
        }
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const handleLogOut = () =>{
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed){
      signOut(auth)
    .then(() => {
      alert("Logging out..");
      navigate("/login");
      console.log("Log out successful!");
    })
      .catch((error) => console.log(error));
    } else {
      console.log("Cancelled");
    }
  }

  return (
    <header>
      <nav className="navbar container">
        <div className="logo">
          <a href="/admin-home">
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
              <a href="/admin-home">Home</a>
            </li>
            <li>
              <a href="/admin-explore">Explore</a>
            </li>
            <li>
              <a href="/admin-about">About Us</a>
            </li>
            <li
              className={`dropdown-icon ${dropdownOpen ? "active" : ""}`}
              onClick={toggleDropdown}
            >
              <a>
                <HiUser />
                Welcome, {authUser ? authUser.userName : ""} <HiChevronDown />
              </a>
              <ul className={`dropdown-items ${dropdownOpen ? "active" : ""}`}>
                <li>
                  <a href="/user/account">Account</a>
                </li>
                <li>
                  <a href="/user/directory">Directory</a>
                </li>
                <li>
                  <a onClick={handleLogOut}>Log Out</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
