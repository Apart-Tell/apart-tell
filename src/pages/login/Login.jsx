import React, {  useEffect, useState } from "react";
import "./login.scss";
import Footer from "../../components/footer/Footer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import AuthDetails from "../../components/firebase/AuthDetails";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
        // will display if anyone tries to login without an account
        if (error.code === "auth/user-not-found") {
          alert("User not found. Please create an account.");
        } else {
          console.log(error);
        }
      });
  };

  const handleLogin = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
      const listen = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setAuthUser(user);
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
              const userData = userDoc.data();
              setAuthUser({
                uid,
                email: user.email,
                userName: userData.userName,
              });
              navigate("/admin-home");
            }
          } else {
            setAuthUser(null);
          }
        } else {
          setAuthUser(null);
        }
      });
      return () => {
        listen();
      };
    }, []);
  
  }

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
              <button type="submit" onClick={handleLogin}> 
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
