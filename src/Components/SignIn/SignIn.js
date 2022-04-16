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

    async function signIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then( async (result) => {
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
            })
    }

    const dispatch = useDispatch()
    return (
        <div className={s.grid}>
            <button onClick={signIn}>
                SignIn
            </button>
        </div>
    );
};

export default SignIn;