import React, {useEffect, useRef, useState} from 'react';
import s from './SignIn.module.css'
import {auth, database} from '../../Firebase/firebaseInit';
import {useDispatch} from 'react-redux';
import {setGuest, setNewUser, setUser} from '../../Redux/user';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';

import {getRoomHash, connectToRoom} from '../../utils/utils';
import {useNavigate} from 'react-router-dom';
import {useUserSelector} from "../../Redux/reduxHooks";

const SignIn = message => {
    const [isAlreadyHaveAccount, setIsAlreadyHaveAccount] = useState(true)
    const email = useRef(null)
    const password = useRef(null)
    const name = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useUserSelector()

    useEffect(()=>{
        if(localStorage.getItem('password') && localStorage.getItem('email')){
            email.current.value = localStorage.getItem('email')
            password.current.value = localStorage.getItem('password')
            handleSubmit({}, false)
            console.log('auto login')
        }
    },[])
    useEffect(()=>{
        if(user.userId === 'testId') return
        try{
            connectToRoom(getRoomHash(), user, dispatch)
        } catch (e) {}
        navigate('/')
    }, [user])
    const titles = {
        createAccount: 'create',
        enter: 'enter',
        guest: 'how guest'
    }

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
                userId: result.user.uid,
                theme: user.theme
            }))
        } catch (err) {
            console.log(err)
            const name = prompt('enter name:')
            dispatch(setNewUser(name))
        }
    }

    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(registrationHandler)
            .catch(err => alert(err))
    }

    function handleSubmit(event, name) {
        event.preventDefault?.()
        if (isAlreadyHaveAccount) {
            auth.signInWithEmailAndPassword(email.current.value, password.current.value)
                .then(registrationHandler)
                .catch(err => console.error(err))
        } else {
            if (!name) return alert('enter name')
            auth.createUserWithEmailAndPassword(email.current.value, password.current.value)
                .then(() => {
                    dispatch(setNewUser(name))
                    connectToRoom(getRoomHash(), user, dispatch)
                    navigate('/')
                })
                .catch(err => console.error(err))
        }
        localStorage.setItem('email', email.current.value)
        localStorage.setItem('password', password.current.value)
    }
    function signInLikeGuest() {
        const name = prompt('enter name:', 'name')
        dispatch(setGuest(name))
    }
    return (
        <div className={s.grid}>
            <form onSubmit={(e) => handleSubmit(e, name.current?.value)}>

                <h1 className={s.title}>{isAlreadyHaveAccount ? 'enter' : 'create new account'}</h1>
                <input placeholder={'email'} ref={email} type="email" className='input'/>
                <input placeholder={'password'} ref={password} type='password' className='input'/>
                {!isAlreadyHaveAccount && <input placeholder={'nickname'} ref={name} type='text' className='input'/>}

                <input
                    type='submit'
                    className={s.button}
                    value='submit'
                />

            </form>
            <button onClick={isAlreadyHaveAccount
                ? () => setIsAlreadyHaveAccount(false)
                : () => setIsAlreadyHaveAccount(true)}
                    className={s.button}
            >
                {isAlreadyHaveAccount
                    ? 'create new account'
                    : 'already have account'}
            </button>

            <div className={s.flex}>
                <button onClick={signInWithGoogle} className={s.button}>
                    google
                </button>
                <button onClick={signInLikeGuest} className={s.button}>
                    guest
                </button>
            </div>

        </div>


    );
};

export default SignIn;