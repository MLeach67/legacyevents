// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqMhGv_nfx36bbnfy_LSzageB4IzP80pI",
  authDomain: "legacy-event-registry.firebaseapp.com",
  projectId: "legacy-event-registry",
  storageBucket: "legacy-event-registry.firebasestorage.app",
  messagingSenderId: "813359207404",
  appId: "1:813359207404:web:e2b8a5bf827fa0a515e6c9",
  measurementId: "G-F5D7NMRXQ5"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

export default firebase;