import React, { useState } from "react";
import "./login.scss";
import Footer from "../../components/footer/Footer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import AuthDetails from "../../components/firebase/AuthDetails";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="logo-login">
        <a href="/">
          <img src="logo-icon.png" alt="apart-tell logo" />
        </a>
      </div>
      <div className="login">
        <div className="login-container">
          <form onSubmit={login}>

            <div className="login-title">
              <h1>Log In</h1>
            </div>

            <div className="login-input-container">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
              ></input>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
              ></input>
            </div>

            <div className="login-button">
              {/* changed from onSubmit() to submit() */}
              <button type="submit"> 
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* testing section */}
      <br />
      <AuthDetails />
      <br />
      
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default Login;
