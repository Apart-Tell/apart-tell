import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import Footer from "../../components/footer/Footer";
import PasswordVisibilityToggle from '../../components/admin/account/PasswordVisibilityToggle';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("User not found. Please create an account.");
        } else if (error.code === "auth/wrong-password") {
          alert("Wrong password. Please try again.");
        }
        else {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    const handleLogin = async (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = doc(collection(db, "users"), uid);
        const userDoc = await getDoc(userRef);
        const userReq = doc(collection(db, "requests"), uid);
        const userReqDoc = await getDoc(userReq);
        if (userDoc.exists()) {
          const userReqData = userReqDoc.data();
          if (userReqData.status !== "approved") {
            alert(
              "Your account is awaiting approval from an admin. Please check back later."
            );
            await signOut(auth);
          } else {
            // const userData = userDoc.data();
            alert("Redirecting you to home page..");
            navigate("/admin-home");
          }
        }
      }
    };

    const listen = onAuthStateChanged(auth, handleLogin);
    return () => {
      listen();
    };
  }, []);

  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
  
  const toggleConfirmationPasswordVisibility = () => {
    setShowConfirmationPassword(!showConfirmationPassword);
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
              />
              <div className="pass-input-field">
                <input
                  type={showConfirmationPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="password-input"
                />
                <PasswordVisibilityToggle onToggle={toggleConfirmationPasswordVisibility}/>
              </div>
              
            </div>

            <div className="login-button">
              <button type="submit">Log In</button>
            </div>
          </form>
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default Login;
