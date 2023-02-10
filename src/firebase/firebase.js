
// credenciales/'usuario y contraseña' para conectarme a firebase en codigo 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import{ getAuth } from 'firebase/auth';   

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//CREDENTIALS /PUBLIC JEY (KEEP SAFE)
// BASICALLY IS THE WAY TO CONNECT TO THE BACKEND APP (CREDENTIALS-PUBLIC KEY)
const firebaseConfig = {
  apiKey: "AIzaSyA77g-waf8YgZaM_0fqyuFeB_O6ed1cRmA",
  authDomain: "react-fb-auth-7f56b.firebaseapp.com",
  projectId: "react-fb-auth-7f56b",
  storageBucket: "react-fb-auth-7f56b.appspot.com",
  messagingSenderId: "848849689008",
  appId: "1:848849689008:web:5b1d2fc6998917b8c49e75",
  measurementId: "G-F2BG34J7FS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 