import React, {useState} from 'react';
import TextBox from '../../Components/TextBox/TextBox';
import Results from '../../Components/Results/Results';
import { useSelector} from 'react-redux';
import s from './Main.module.css'
import {useInterval} from '@mantine/hooks';

const Main = () => {
    const typingEnd = useSelector((state)=>state.isTypingEnd.value)
    return (
        <div className={s.wrapper}>
            {typingEnd
                ?<Results

                    />
                :<TextBox
                    // seconds={seconds}
                    // interval={interval}
                />}
        </div>
    );
};

export default Main;