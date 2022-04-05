import React, {useEffect, useRef, useState} from 'react';
import s from './TextBox.module.css'
import '../fonts/robotomono.css'
import {keyboard} from '@testing-library/user-event/dist/keyboard';

const TextBox = () => {
    const [text, setText] = useState('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, consequuntur cum cumque cupiditate deserunt distinctio, illum, laboriosam nesciunt nulla obcaecati optio quidem reprehenderit saepe sed sunt veritatis voluptas voluptate voluptatibus?')
    const [cursorPosition, setCursorPosition] = useState(0)
    const [currentCharacter, setCurrentCharacter] = useState(' ')
    useEffect(()=>{
        window.addEventListener('keydown', keyboardHandler);
    },[])
    const cursor = useRef()

    function keyboardHandler(e) {
        console.log(String.fromCharCode(e.keyCode).charCodeAt(0))
        console.log('...'+text[cursorPosition].charCodeAt(0))
        setCurrentCharacter(String.fromCharCode(e.keyCode))
        if(String.fromCharCode(e.keyCode) === text[cursorPosition]){
            cursor.current.style.left = `${(cursorPosition+1)*10}px`
            setCursorPosition(cursorPosition+1)
            console.log( `${cursorPosition*10}px`)

        }
    }

    return (
        <div className={s.text__wrapper}>
            <div ref={cursor} className={s.cursor}/>
            <p className={s.text}>
                {text}
            </p>
        </div>
    );
};

export default TextBox;