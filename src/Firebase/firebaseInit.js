import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import {useEffect, useState} from 'react';
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

export function setPositionOfCursorInDatabase(room, index, userId) {
    if (room === 'testRoom'||!room) return
    database.ref('rooms/' + room + '/users/' + userId).update({
        index,
    })
}

export function setUserInRoom(room, user) {
    if (room === 'testRoom'||!room||user.userId==='testId') return
    console.log(user)
    const ref = database.ref('rooms/' + room + '/users/' + user.userId)
    ref.set({
        name: user.name,
        index: 0
    })
    ref.onDisconnect().remove()
}

export function useUsersFromDatabase(roomId,myName) {
    const [users, setUsers] = useState([])
    useEffect(() => {

            const ref = database.ref('rooms/' + roomId + '/users');
            ref.on('value', (snapshot) => {
                const arr = []
                const obj = snapshot.val()
                if(!obj)return
                for (let [key, value] of Object.entries(obj)) {
                    if(value?.name === myName)continue
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
        ref.on('value', (snapshot) => {
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





