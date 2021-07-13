import firebase from "firebase/app";
import 'firebase/firestore';

//firebase config
var firebaseConfig = {
    apiKey: "AIzaSyD6h-LtL5AyEs9lKhFmq-Y60SGbfMG2Qsc",
    authDomain: "orangepaper-coderhouse.firebaseapp.com",
    projectId: "orangepaper-coderhouse",
    storageBucket: "orangepaper-coderhouse.appspot.com",
    messagingSenderId: "1042362089634",
    appId: "1:1042362089634:web:d0d9aa82cc1aaf6a50d7fb",
    measurementId: "G-2E5K260G18"
  };

// inicialize firebase
const fb =  firebase.initializeApp(firebaseConfig);



//disponible para todo 
export const database = fb.firestore();


