import React from 'react';
import {ReactComponent as Restart} from '../../svg/restart.svg';
import s from './RestartButton.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {toRestartGame, toRoom} from '../../Redux/roomData';
import {generateRandomText} from '../../utils/utils';
import {auth} from '../../Firebase/firebaseInit';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useRoomDataSelector, useUserSelector} from "../../Redux/reduxHooks";
const RestartButton = () => {
    const {roomId} = useRoomDataSelector()
    const dispatch = useDispatch()
    const {userId} = useUserSelector()
    function restartGame() {
        dispatch(toRestartGame())
        if (document.activeElement instanceof HTMLElement)
            document.activeElement.blur();
    }

    return (
        <div className={s.wrapper}>
            <button disabled={userId !== roomId} tabIndex={0} onClick={restartGame}>
                <Restart/>
            </button>
        </div>

    );
};

export default RestartButton;