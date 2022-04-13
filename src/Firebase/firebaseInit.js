import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA9qTflWVdIkz_tYLf_H0Zj1b7UqHWlCQc",
    authDomain: "typus-69ddd.firebaseapp.com",
    projectId: "typus-69ddd",
    storageBucket: "typus-69ddd.appspot.com",
    messagingSenderId: "347165463317",
    appId: "1:347165463317:web:eca71dd710d678d9d58f1c"
};


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
