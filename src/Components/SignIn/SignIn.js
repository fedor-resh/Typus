import React, {useState} from 'react';
import s from './SignIn.module.css'
import {auth, database, signInWithGoogle} from '../../Firebase/firebaseInit';
import {useDispatch, useSelector} from 'react-redux';
import {setUser, setUserInDatabase} from '../../Redux/user';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const SignIn = () => {
    async function handleRegistration(result) {
            let data
            await database.ref('users/' + result.user.uid + '/name').once('value',snapshot=>{
                data = snapshot.val()
            })
            if (!data) {
                const name = prompt('name on english(max length 5): ')
                dispatch(setUserInDatabase(name))
            }else {
                setUser({name:data,id:result.user.uid})
            }
    }
    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then( handleRegistration)
    }
    function singInWithEmail() {
        const email = prompt('enter email')
        const password = prompt('enter password')
        auth.signInWithEmailAndPassword(email,password)
            .then(handleRegistration)
            .catch(()=>alert('error'))
    }
    function logInWithEmail() {
        const email = prompt('enter email')
        const password = prompt('enter password')
        auth.createUserWithEmailAndPassword(email,password)
            .then(handleRegistration)
            .catch(()=>alert('error'))
    }

    const dispatch = useDispatch()
    return (
        <div className={s.grid}>
            <button onClick={signInWithGoogle}>
                Sign In With Google
            </button>
            <button onClick={singInWithEmail}>
                Sign In With Email
            </button>
            <button onClick={logInWithEmail}>
                log In With Email
            </button>
        </div>
    );
};

export default SignIn;