import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import {useEffect, useState} from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyA9qTflWVdIkz_tYLf_H0Zj1b7UqHWlCQc",
    authDomain: "typus-69ddd.firebaseapp.com",
    databaseURL: "https://typus-69ddd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "typus-69ddd",
    storageBucket: "typus-69ddd.appspot.com",
    messagingSenderId: "347165463317",
    appId: "1:347165463317:web:eca71dd710d678d9d58f1c"
};


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();


export function setResultsInDatabase(room, name, userId, charPerMinute, PercentageOfRight, ball) {
    database.ref(room + '/results').push().set({
        name,
        charPerMinute,
        PercentageOfRight,
        ball,
    });
}
export function useResultsFromDatabase(roomId) {
    const [results,setResults] = useState([])

    useEffect(()=>{
        const res = []
        const ref = database.ref(roomId + '/results');
        ref.once('value', (snapshot) => {
            const obj = snapshot.val()
            for(let id in obj){
                res.push(obj[id])
            }
            setResults(res)
        });

        // ref.set({})
    },[])
    return results
}
export function clearResultsInDatabase(room){
    database.ref(room + '/results').set({});
}
// export function useResultsFromDatabase(room) {
//     const [results,setResults] = useState([])
//
//     useEffect(()=>{
//         const res = []
//         const ref = database.ref(room + '/results');
//         ref.once('value', (snapshot) => {
//             const obj = snapshot.val()
//             for(let id in obj){
//                 res.push(obj[id])
//             }
//             setResults(res)
//         });
//     },[])
//
//
//     return results
//
// }

// export function useData(collection){
//     const [state, setState] = useState([])
//     useEffect(() => onSnapshot(firestore.collection(collection), (snapshot) => {
//         setState(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
//     }), [])
//     return state
// }
// export function createNewRoomCollection(roomId) {
//     firestore.collection(roomId).doc('roomSettings').set({
//         roomId
//     })
// }
export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}
