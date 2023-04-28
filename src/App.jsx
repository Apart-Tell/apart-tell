import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvm43S5VJsmg8pF_tLfhvCIFYSnXM85Bg",
  authDomain: "apart-tell.firebaseapp.com",
  databaseURL: "https://apart-tell-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "apart-tell",
  storageBucket: "apart-tell.appspot.com",
  messagingSenderId: "435778951435",
  appId: "1:435778951435:web:19a2d4a9ee6f5580112a0e",
  measurementId: "G-21WQSCSH3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


//testing firebase
import {doc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";

await setDoc(doc(db, "users", "user2"), {
  email: "satorii.pelayo@gmail.com",
  name:{fname:"satori", lname:"pelayo"},
  password:"bwisit",
  username:"ahahahahah"
});

//this is bare minimum to create a document
await setDoc(doc(db, "dorms", "dorm2"),{
  
});

await updateDoc(doc(db, "dorms", "dorm2"),{
  dormDesc:{name:"my dorm"},
  format: "eheheheheheh"
})

//await deleteDoc(doc(db, "dorms", "dorm2"));




//end of testing

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more hi
      </p>
    </div>
  )
}

export default App
