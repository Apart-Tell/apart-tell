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
      <div className="logo1">
        <a href="/">
          <img src="logo-icon.png" alt="apart-tell logo" />
        </a>
      </div>

      <div className="sign-up-container">
        <form onSubmit={signUp}>
          <h1 className="Register-text">Register</h1>
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            className="inputfname"
            onChange={(e) => setFname(e.target.value)}
          ></input>
          <br />
          <input
            type="text"
            placeholder="Middle Name"
            value={middlename}
            className="inputmname"
            onChange={(e) => setMname(e.target.value)}
          ></input>
          <br />
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            className="inputlname"
            onChange={(e) => setLname(e.target.value)}
          ></input>
          <br />
          <input
            type="text"
            placeholder="Create username"
            value={username}
            className="inputuname"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            className="inputemail"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            className="inputpword"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />

          <button className="Reg-Button" type="submit">
            Register
          </button>
          <div class="or-lines">
            <hr class="line"></hr>
            <span class="or-text">or</span>
            <hr class="line-1"></hr>
          </div>

          <button className="Google-Button" type="submit">
            Register with Google
          </button>

          {/*images*/}
          <img src="Vector.png" alt="apart-tell vector" className="vector" />
          <img src="Vector.png" alt="apart-tell vector" className="vector1" />
          <img src="Vector.png" alt="apart-tell vector" className="vector2" />
          <img src="Vector.png" alt="apart-tell vector" className="vector3" />
          <img src="lock.png" alt="apart-tell vector1" className="lock" />
          <img src="pnum.png" alt="apart-tell vector2" className="pnum" />
        </form>
      </div>
      <brs />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Register;
