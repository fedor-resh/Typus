import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import {useEffect, useState} from 'react';
import results from '../Components/Results/Results';
import {setUser, setNewUser} from '../Redux/user';

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

export function setPositionOfCursorInDatabase(room, curLine, curPosition) {
    if (room === 'testRoom'||!room) return
    database.ref('rooms/' + room + '/users/' + auth.currentUser.uid).update({
        curLine,
        curPosition
    })
}

export function setUserInRoom(room, name) {
    if (room === 'testRoom'||!room) return
    const ref = database.ref('rooms/' + room + '/users/' + auth.currentUser.uid)
    ref.set({
        name: name,
        curLine: 0,
        curPosition: 0
    })
    ref.onDisconnect()
        .remove()
}
// export function useUsersFromDatabase(roomId,myName) {
//     const [users, setUsers] = useState([])
//     useEffect(() => {
//         setTimeout(() => {
//
//
//             const arr = users
//             const ref = database.ref('rooms/' + roomId + '/users');
//             ref.once('value', (snapshot) => {
//                 const obj = snapshot.val()
//                 for (let id in obj) {
//                     arr.push(obj[id])
//                 }
//                 setUsers(arr)
//             });
//
//             ref.on('child_changed', (snapshot) => {
//                 const arr = users
//
//
//                 const obj = snapshot.val()
//                 if(obj.name === myName)return
//                 const oldObj = arr.find(el => el.name === obj.name)
//
//                 if (oldObj) {
//                     arr[arr.indexOf(oldObj)] = obj
//                 } else {
//                     arr.push(obj)
//                 }
//
//                 setUsers(arr)
//             });
//         }, 200)
//
//     }, [roomId])
//     return users
// }

export function useUsersFromDatabase(roomId,myName) {
    const [users, setUsers] = useState([])
    useEffect(() => {

            const ref = database.ref('rooms/' + roomId + '/users');
            ref.on('value', (snapshot) => {
                const arr = []
                const obj = snapshot.val()
                if(!obj)return
                console.log(obj)
                for (let [key, value] of Object.entries(obj)) {
                    console.log(key,value)
                    if(value.name === myName)continue
                    arr.push(value)
                }
                setUsers(arr)
            });

    }, [roomId])
    return users
}

export function setResultsInDatabase(room, name, userId, charPerMinute, PercentageOfRight, ball) {
    database.ref('rooms/' + room + '/results').push().set({
        name,
        charPerMinute,
        PercentageOfRight,
        ball,
    });
}

export function useResultsFromDatabase(roomId) {
    const [results, setResults] = useState([])

    useEffect(() => {
        const ref = database.ref('rooms/' + roomId + '/results');
        ref.once('value', (snapshot) => {
            const res = [...results]

            const obj = snapshot.val()
            for (let id in obj) {
                res.push(obj[id])
            }
            setResults(res)
        });

    }, [])
    return results
}

export function useRoomsFromDatabase() {
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const ref = database.ref('rooms/');
        ref.on('value', (snapshot) => {
            let arr = []
            const obj = snapshot.val()
            for (let [key, value] of Object.entries(obj)) {

                if(key==='testRoom')continue
                arr.push(value)
            }
            setRooms(arr)
        });
    }, [])
    return rooms
}


export function clearResultsInDatabase(roomId) {
    database.ref('rooms/' + roomId + '/results').remove();
}

export function clearUsersInRoom(roomId) {
    database.ref('rooms/' + roomId + '/users').remove();
}





