import React from 'react';
import s from './SignIn.module.css'
import {signInWithGoogle} from '../../Firebase/firebaseInit';
const SignIn = () => {
    return (
        <div className={s.grid}>
            <button onClick={signInWithGoogle}>
                SignIn
            </button>
        </div>
    );
};

export default SignIn;