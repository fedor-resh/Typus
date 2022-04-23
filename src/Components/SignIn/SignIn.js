import React, {useRef, useState} from 'react';
import s from './SignIn.module.css'
import {auth, database, signInWithGoogle} from '../../Firebase/firebaseInit';
import {useDispatch, useSelector} from 'react-redux';
import {setUser, setUserInDatabase} from '../../Redux/user';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import Modal from '../../UI/Modal/Modal';

const SignIn = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isAlreadyHaveAccount, setIsAlreadyHaveAccount] = useState(true)
    const email = useRef(null)
    const password = useRef(null)

    const dispatch = useDispatch()

    async function handleRegistration(result) {
        let data
        await database.ref('users/' + result.user.uid + '/name').once('value', snapshot => {
            data = snapshot.val()
        })
        if (!data) {
            const name = prompt('name on english(max length 5): ')
            dispatch(setUserInDatabase(name))
        } else {
            setUser({name: data, id: result.user.uid})
        }
    }

    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(handleRegistration)
            .catch(err => alert(err))
    }

    function singInWithEmail() {
        setIsAlreadyHaveAccount(true)
        setIsModalOpen(true)
    }

    function logInWithEmail() {
        setIsAlreadyHaveAccount(false)
        setIsModalOpen(true)
    }

    function handleSubmit() {
        if (isAlreadyHaveAccount) {
            auth.signInWithEmailAndPassword(email.current.value, password.current.value)
                .then(handleRegistration)
                .catch(err => alert(err))
        } else {
            auth.createUserWithEmailAndPassword(email.current.value, password.current.value)
                .then(handleRegistration)
                .catch(err => alert(err))
        }
    }

    return (
        <div >
            {isModalOpen && <Modal onClose={() => setIsModalOpen(false)}>
                <div className={s.modal}>
                    <center><h1>{isAlreadyHaveAccount?'enter':'create new account'}</h1></center>
                    <center><input placeholder={'email'} ref={email} type="email"/></center>
                    <center><input placeholder={'password'} ref={password} type='password'/></center>
                    <center><button onClick={handleSubmit}>submit</button></center>
                </div>
            </Modal>}
            <div className={s.grid}>
                <button onClick={signInWithGoogle}>
                    sign in with google
                </button>
                <button onClick={singInWithEmail}>
                    already have an account
                </button>
                <button onClick={logInWithEmail}>
                    Create account
                </button>
            </div>
        </div>

    );
};

export default SignIn;