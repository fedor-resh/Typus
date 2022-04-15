import React from 'react';
import {ReactComponent as Restart} from '../../svg/restart.svg';
import s from './RestartButton.module.css'
import {useDispatch} from 'react-redux';
import {toRestartGame, toRoom} from '../../Redux/roomData';
import {generateRandomText} from '../../utils';
const RestartButton = () => {
    const dispatch = useDispatch()
    function restartGame() {
        dispatch(toRestartGame())
        if (document.activeElement instanceof HTMLElement)
            document.activeElement.blur();
    }

    return (
        <div className={s.wrapper}>
            <button tabIndex={0} onClick={restartGame}>
                <Restart/>
            </button>
        </div>

    );
};

export default RestartButton;