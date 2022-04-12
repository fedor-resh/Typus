import React, {useEffect, useState} from 'react';
import s from './Timer.module.css'

const Timer = ({seconds}) => {

    const time = seconds>59
        ?`0${Math.floor(seconds/60)}:${seconds%60>9?seconds%60:'0'+seconds%60}`
        :seconds
    return (
        <div>
            <p className={s.text}>{time}</p>
        </div>
    );
};

export default Timer;