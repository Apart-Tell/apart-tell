import React, { useState } from "react";
import './register.scss';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";


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
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error);
        });
    };  

    return(
        <>
        <Header/>
        <div className="sign-up-container">
      <form onSubmit={signUp}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFname(e.target.value)}
        ></input><br/>
         <input
          type="text"
          placeholder="Middle Name"
          value={middlename}
          onChange={(e) => setMname(e.target.value)}
        ></input><br/>
         <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLname(e.target.value)}
        ></input><br/>
           <input
          type="text"
          placeholder="Create username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input><br/>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input><br/>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input><br/>
        <button type="submit">Register</button>
      </form>
      <form>
        <button type="submit">or Log In With Google</button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Register;