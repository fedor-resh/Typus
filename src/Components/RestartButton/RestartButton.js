import React from 'react';
import {ReactComponent as Restart} from '../../svg/restart.svg';
import s from './RestartButton.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {toRestartGame, toRoom} from '../../Redux/roomData';
import {generateRandomText} from '../../utils';
import {auth} from '../../Firebase/firebaseInit';
import {useAuthState} from 'react-firebase-hooks/auth';
const RestartButton = () => {
    const [user] = useAuthState(auth)
    const roomId = useSelector(state => state.roomData.roomId)
    const dispatch = useDispatch()
    function restartGame() {
        dispatch(toRestartGame())
        if (document.activeElement instanceof HTMLElement)
            document.activeElement.blur();
    }

    return (
        <div className={s.wrapper}>
            <button disabled={user.uid !== roomId} tabIndex={0} onClick={restartGame}>
                <Restart/>
            </button>
        </div>

    );
};

export default RestartButton;