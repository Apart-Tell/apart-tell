import React, { useState } from "react";
import "./register.scss";
import Footer from "../../components/footer/Footer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const Register = () => {
  const [firstname, setFname] = useState("");
  const [middlename, setMname] = useState("");
  const [lastname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const docRef = doc(db, "users", userCredential.user.uid);
        setDoc(docRef, {
          firstName: firstname,
          lastName: lastname,
          userName: username,
          email: email,
        }).catch((error) => {
          console.log(
            "Something went wrong with adding user to Firestore: ",
            error
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <div className="logo">
        <a href="/">
          <img src="logo-icon.png" alt="apart-tell logo" />
        </a>
    </div>
    <div className="registration">
        <div className="register-container">
            <form onSubmit={signUp}>

              <div className="register-title">
                <h1>Register</h1>
              </div>

              <div className="register-input-container">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstname}
                    className="inputfname"
                    onChange={(e) => setFname(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    placeholder="Middle Name"
                    value={middlename}
                    className="inputmname"
                    onChange={(e) => setMname(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastname}
                    className="inputlname"
                    onChange={(e) => setLname(e.target.value)}
                  ></input>
                  <input
                    type="text"
                    placeholder="Create username"
                    value={username}
                    className="inputuname"
                    onChange={(e) => setUsername(e.target.value)}
                  ></input>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    className="inputemail"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    className="inputpword"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
              </div>

              <div className="register-button">
                <button type="button" onClick={() => document.querySelector('form').onSubmit()}>
                  Register
                </button>
              </div>
            </form>
        </div>
    </div>

    <div className="footer">
      <Footer />
    </div>
    </>
  );
};

export default Register;
