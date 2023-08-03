// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCwqwv3W0qKtE_wAZoChB79uRqpZz6zoR8",
	authDomain: "social-media-project-d33cc.firebaseapp.com",
	projectId: "social-media-project-d33cc",
	storageBucket: "social-media-project-d33cc.appspot.com",
	messagingSenderId: "1044013265786",
	appId: "1:1044013265786:web:bac8efe0c7767e9e235cc3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
