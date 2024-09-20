import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTCNzwrlYO57bodBt5B-7S3F3bnTDgb0M",
    authDomain: "translate-pf.firebaseapp.com",
    projectId: "translate-pf",
    storageBucket: "translate-pf.appspot.com",
    messagingSenderId: "646065326807",
    appId: "1:646065326807:web:f691193d5aa9b676d23e92",
    measurementId: "G-BC4DCHMMFD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);