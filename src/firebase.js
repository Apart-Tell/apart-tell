// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
export const auth = getAuth(app);