import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import s from './SettingsPage.module.css'
import {Button} from "../../UI/Button/Button";
import {updateRoomData} from "../../Redux/roomData";
import {useDebounceEffect, useInput} from "../../utils/hooks";
import Slider from "../../UI/Slider/Slider";

const SettingsPage = () => {
    const {title, password, text, secondsForGame} = useSelector(state => state.roomData.value)
    const [seconds, setSeconds] = useState(secondsForGame)
    const dispatch = useDispatch()
    const passwordInput = useInput(password)
    const customText = useInput(text)

    function saveSettings() {
        dispatch(updateRoomData({
            password: passwordInput.value || '',
            text: customText.value || 'text',
            secondsForGame:seconds
        }))
    }

    useDebounceEffect(()=>{
        saveSettings()
    },[passwordInput.value,customText.value,seconds],500)

    return (
        <>
            <p>settings of {title} room</p>
            <div className={s.settings}>
                <div className={s.item}>
                    <p>time</p>
                    <Slider value={seconds} setValue={setSeconds} isTimePanelVisible/>
                </div>
                <div className={s.item}>
                    <p>password</p>
                    <input
                        {...passwordInput.bind}
                        placeholder='add password'
                        style={{padding:'5px 20px',marginLeft: 10}}
                        type="text"
                    />
                </div>
                <div className={s.item}>
                    <p>custom text</p>
                    <textarea
                        {...customText.bind}
                        className={s.customTextArea}
                        defaultValue={text}
                        type="text"
                    />
                </div>
            </div>
        </>
    );
};

export default SettingsPage;