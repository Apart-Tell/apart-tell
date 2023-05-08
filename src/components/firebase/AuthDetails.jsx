import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, getDoc, doc } from "firebase/firestore";

const AuthDetails = () => {
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
          setAuthUser({ uid, email: user.email, userName: userData.userName });
        }
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      {authUser ? (
        <>
          <p>signed in as {authUser.userName}</p>
          <br />
          <button onClick={userSignOut}>sign out</button>
        </>
      ) : (
        <p>signed out</p>
      )}
    </div>
  );
};
export default AuthDetails;
