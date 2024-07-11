// Import the functions you need from the SDKs you need

import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase movies that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcq0Hu3FTddmL0hpmHKlkD4I5EQv8USSk",
    authDomain: "movieproject-4dc1b.firebaseapp.com",
    projectId: "movieproject-4dc1b",
    storageBucket: "movieproject-4dc1b.appspot.com",
    messagingSenderId: "187866983661",
    appId: "1:187866983661:web:b579dd687ddd8c6f3a30e4",
    measurementId: "G-SLVZF46GCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
