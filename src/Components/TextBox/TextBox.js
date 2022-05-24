import React, {Fragment, useEffect, useRef, useState} from 'react';
import s from './TextBox.module.css'
import '../../fonts/fonts.css'
import {useDispatch, useSelector} from 'react-redux';
import {toEnd, toResults, toStart} from '../../Redux/roomData';
import Timer from '../../UI/Timer/Timer';
import {useInterval} from '@mantine/hooks';
import {setResult} from '../../Redux/resultSlider';
import {
    auth,
    clearResultsInDatabase, clearUsersInRoom,
    setPositionOfCursorInDatabase, setUserInRoom,
    useUsersFromDatabase
} from '../../Firebase/firebaseInit';
import {
    calculateCurrentColumnAndRow,
    calculateLengthOfLines,
    isAllowedKeyboardKey,
    isUnderline,
    setStyles
} from './textBoxUtils';
import Cursor from './Cursor';


const TextBox = () => {
    const {text,secondsForGame,mainState,roomId,language,isEndDependsOnTime} = useSelector(state => state.roomData.value)
    const name = useSelector(state => state.user.name)
    const users = useUsersFromDatabase(roomId,name)


    const [indexOfCurrentCharacter, setIndexOfCurrentCharacter] = useState(0)
    const [lengthOfLines, setLengthOfLines] = useState([])
    const [mistakes, setMistakes] = useState([])
    const [seconds, setSeconds] = useState(secondsForGame)
    const [isStarted, setIsStarted] = useState(false)

    const cursorRef = useRef(null)
    const textRef = useRef(null)

    const dispatch = useDispatch()
    const interval = useInterval(() => setSeconds(s => s - 1), 1000);

    function endHandler() {
        dispatch(setResult({
            roomId,
            amountOfCharacters: indexOfCurrentCharacter,
            seconds: secondsForGame,
            amountOfMistakes: mistakes.length,
            name
        }))

        setTimeout(()=>{
            dispatch(toResults())
        },300)
    }
    function resetTextBoxState() {
        setUserInRoom(roomId,name)
        setLengthOfLines(calculateLengthOfLines(textRef))
        setIndexOfCurrentCharacter(0)
        setMistakes([])
        interval.stop()
        setStyles(0, 0,cursorRef.current)
        setIsStarted(false)
        setSeconds(secondsForGame)
    }

    useEffect(() => {
        clearResultsInDatabase(roomId)
        setUserInRoom(roomId,name)
        setLengthOfLines(calculateLengthOfLines(textRef))
        return interval.stop
    }, [])
    useEffect(()=>{
        if(mainState==='ROOM_TYPE'){
            setTimeout(()=>{
                setIsStarted(true)
                interval.start()

            },3000)
        }
    },[mainState])
    useEffect(()=>{
        resetTextBoxState()
    },[text,language])
    useEffect(() => {
        if (mainState==='RESULTS'||!seconds) {
            endHandler()
        }
    }, [mainState,seconds])
    useEffect(()=>{
        setSeconds(secondsForGame)
    },[secondsForGame])
    useEffect(() => {
        window.addEventListener('keydown', keyboardHandler);
        return () => {
            window.removeEventListener('keydown', keyboardHandler)
        }
    }, [keyboardHandler])



    function keyboardHandler(e) {
        if((!isAllowedKeyboardKey(e.key))
            || (indexOfCurrentCharacter === text.length
                &&e.key!=='Backspace')) return

        if((roomId==='testRoom'||auth.currentUser.uid===roomId)&&!isStarted) {
            dispatch(toStart())
        }
        if(!isStarted) return

        function BackspaceHandler() {
            if (index === 0) return
            index--
            setMistakes(mistakes.filter(el => el < index))
        }


        const keyboardCharacter = e.key
        let index = indexOfCurrentCharacter
        if (keyboardCharacter === 'Backspace') {
            BackspaceHandler()
        } else {
            if (keyboardCharacter !== text[index]) {
                setMistakes([index, ...mistakes])
            }
            index++
        }
        setPositionOfCursorInDatabase(roomId, index)
        const [x, y] = calculateCurrentColumnAndRow(index,lengthOfLines)
        setStyles(y, x ,cursorRef.current)
        setIndexOfCurrentCharacter(index)
    }

    return (
        <>

            <div className={s.text__wrapper}>
                {isEndDependsOnTime&&<Timer
                    playStartAnimation={mainState==='ROOM_TYPE'}
                    seconds={seconds}
                />}
                <div>
                    {users&&users
                        .filter(user=>user.name!==name)
                        .map(user=>
                            <Cursor lengthOfLines={lengthOfLines} {...user}/>
                        )}
                </div>
                <div ref={cursorRef} className={s.cursor}/>
                <p ref={textRef} className={s.text}>

                    {Array.from(text).map((character, id) =>
                        <span
                            className={`${id >= indexOfCurrentCharacter ? s.disabled__letter : ''} ${mistakes.includes(id) ? s.mistake__letter : ''}`}
                            key={id}>
                            {isUnderline(id,character,lengthOfLines,mistakes)?'_':character}
                        </span>
                    )}
                    <input type="text" className={s.input__for__phones}/>
                </p>
            </div>
        </>


    );
};

export default TextBox;