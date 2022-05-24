import React, {useRef, useState} from 'react';
import s from './SignIn.module.css'
import {auth, database, setUserInRoom, signInWithGoogle} from '../../Firebase/firebaseInit';
import {useDispatch, useSelector} from 'react-redux';
import {setUser, setNewUser} from '../../Redux/user';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';

import {roomConnect, setThemeClass} from '../../utils/utils';
import {current} from '@reduxjs/toolkit';
import {useNavigate} from 'react-router-dom';

const SignIn = message => {
    const [isAlreadyHaveAccount, setIsAlreadyHaveAccount] = useState(true)
    const email = useRef(null)
    const password = useRef(null)
    const name = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function registrationHandler(result) {
        try {
            let user
            await database
                .ref('users/' + result.user.uid)
                .once('value', snapshot => {
                    user = snapshot.val()
                })

            dispatch(setUser({
                name: user.name,
                id: result.user.uid,
                theme: user.theme
            }))
            roomConnect(window.location.hash.substring(1), name.current?.value, dispatch)
        } catch (err) {
            console.log(err)
            const name = prompt('enter name:')
            dispatch(setNewUser(name))
        }finally {
            navigate('/')
        }

    }

    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(registrationHandler)
            .catch(err => alert(err))
    }

    function handleSubmit(name) {
        if (isAlreadyHaveAccount) {
            auth.signInWithEmailAndPassword(email.current.value, password.current.value)
                .then(registrationHandler)
                .catch(err => console.error(err))
        } else {
            if (!name) return alert('enter name')
            auth.createUserWithEmailAndPassword(email.current.value, password.current.value)
                .then(() => {
                    dispatch(setNewUser(name))
<<<<<<< HEAD
                    roomConnect(window.location.hash.substring(1), name.current?.value, dispatch)
                    navigate('/')
=======
                    roomConnect(window.location.hash.substring(1), name.current.value, dispatch)
>>>>>>> 94a7a8e69f8d0e87851e283e651f9766e62a6e5a
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <div>
            <div className={s.modal}>
                <center><h1>{isAlreadyHaveAccount ? 'enter' : 'create new account'}</h1></center>
                <center><input placeholder={'email'} ref={email} type="email"/></center>
                <center><input placeholder={'password'} ref={password} type='password'/></center>
                {!isAlreadyHaveAccount && <center><input placeholder={'nickname'} ref={name} type='text'/></center>}
                <center>
                    <button onClick={() => handleSubmit(name.current?.value ?? 'name')}>submit</button>
                </center>
                <center>
                    <button onClick={isAlreadyHaveAccount
                        ? () => setIsAlreadyHaveAccount(false)
                        : () => setIsAlreadyHaveAccount(true)}>
                        {isAlreadyHaveAccount
                            ? 'create new account'
                            : 'already have account'}
                    </button>
                </center>
                <center>
                    <button onClick={signInWithGoogle}>
                        sign in with google
                    </button>
                </center>
            </div>
        </div>

    );
};

export default SignIn;