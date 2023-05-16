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

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };
  
  return (
    <div>
      {authUser && authUser.userName && (
        <>

          <a href="/admin-home"> <p>signed in as {authUser.userName}</p></a>
          <br />
          <button onClick={userSignOut}>sign out</button>
        </>
      )}
      {!authUser && <p>signed out</p>}
    </div>
  );
};
export default AuthDetails;