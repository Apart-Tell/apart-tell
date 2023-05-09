import React, { useState } from "react";
import "./login.scss";
import Header from "../../components/header/Header";
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
      
      <div className="logo1">
      <a href="/">
          <img src="logo-icon.png" alt="apart-tell logo" />
        </a>
      </div>
      <div className="login-container">
        <form onSubmit={login}>
          <h1 className="Register-text">Log In</h1>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputEmail"
          ></input>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputPword"
          ></input>
          <button type="submit" className="Login-Button">
            Log In
          </button>
          <div class="or-lines">
            <hr class="linea"></hr>
            <span class="or-textA">or</span>
            <hr class="line-1a"></hr>
          </div>

          <button className="Google-ButtonA" type="submit">
            Log In with Google
          </button>
          {/*images*/}
          <img src="Vector.png" alt="apart-tell vector" className="vectorA" />
          <img src="lock.png" alt="apart-tell vector1" className="lockA" />
        </form>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <AuthDetails />
      <a href="/admin-home">Testing</a>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Login;
