import React, { useState } from "react";
import "./register.scss";
import Footer from "../../components/footer/Footer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const Register = () => {
  const [firstname, setFname] = useState("");
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
          role: "pending"
        })
          .then(() => {
            const requestDocRef = doc(db, "requests", userCredential.user.uid);
            setDoc(requestDocRef, {
              firstName: firstname,
              lastName: lastname,
              userName: username,
              email: email,
              createdAt: serverTimestamp(),
              status: "pending"
            })
              .then(() => {
                const message = "You have been registered. Your account is awaiting approval from the superadmin.";
                alert(message); // Display the alert message
              })
              .catch((error) => {
                console.log("Something went wrong with adding user to 'requests' collection: ", error);
              });
          })
          .catch((error) => {
            console.log("Something went wrong with adding user to 'users' collection: ", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="logo-reg">
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
                className="text-input"
                onChange={(e) => setFname(e.target.value)}
              ></input>
              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                className="text-input"
                onChange={(e) => setLname(e.target.value)}
              ></input>
              <input
                type="text"
                placeholder="Enter a username"
                value={username}
                className="text-input"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                className="email-input"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                className="password-input"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <div className="register-button">
              <button type="submit">Register</button>
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
