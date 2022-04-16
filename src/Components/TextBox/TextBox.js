import React, {Fragment, useEffect, useRef, useState} from 'react';
import s from './TextBox.module.css'
import '../../fonts/fonts.css'
import {useDispatch, useSelector} from 'react-redux';
import {toEnd, toResults, toStart} from '../../Redux/roomData';
import Timer from '../Timer/Timer';
import {useInterval} from '@mantine/hooks';
import {setResult} from '../../Redux/resultSlider';
import {
    auth,
    clearResultsInDatabase,
    setPositionOfCursorInDatabase, setUserInRoom,
    useUsersFromDatabase
} from '../../Firebase/firebaseInit';


const TextBox = () => {
    const text = useSelector(state => state.roomData.text)
    const secondsForGame = useSelector(state => state.roomData.secondsForGame)
    const mainState = useSelector(state => state.roomData.mainState)
    const roomId = useSelector(state => state.roomData.roomId)
    const name = useSelector(state => state.user.name)
    const users = useUsersFromDatabase(roomId)

    const [indexOfCurrentCharacter, setIndexOfCurrentCharacter] = useState(0)
    const [lengthOfLines, setLengthOfLines] = useState([])
    const [mistakes, setMistakes] = useState([])
    const [seconds, setSeconds] = useState(secondsForGame)
    const [isStarted, setIsStarted] = useState(false)

    const cursorRef = useRef(null)
    const textRef = useRef(null)
    const usersCursors = useRef(null)

    const dispatch = useDispatch()
    const interval = useInterval(() => setSeconds(s => s - 1), 1000);
    function setStyles(curLine, curPosition, cursorRef) {
        if(cursorRef){
            cursorRef.style.top = `${(curLine) * 38 + 4}px`
            cursorRef.style.left = `${(curPosition) * 14.9 - 1}px`
        }
        // console.log({curLine, curPosition, cursorRef})

    }

    function calculateLengthOfLines(textRef) {
        const textBoxWidth = textRef.current.scrollWidth
        const words = textRef.current.textContent.split(/\s/)
        const lengthOfWords = words.map((word) => word.length)
        const LinesLength = []
        let sum = 0
        lengthOfWords.forEach((length) => {
            if ((sum + length) * 14.9 > textBoxWidth) {
                LinesLength.push(sum)
                sum = 0
            }
            sum += length + 1
        })
        LinesLength.push(sum)
        return LinesLength
    }

    function endHandler() {
        dispatch(setResult({
            roomId,
            amountOfCharacters: indexOfCurrentCharacter,
            seconds: secondsForGame,
            amountOfMistakes: mistakes.length,
            name
        }))
        setUserInRoom(roomId,name)
        setTimeout(()=>{
            dispatch(toResults())
        },200)
    }
    function resetTextBoxState() {

        setLengthOfLines(calculateLengthOfLines(textRef))
        setIndexOfCurrentCharacter(0)
        setMistakes([])
        interval.stop()
        setStyles(0, 0,cursorRef.current)
        setIsStarted(false)
        setSeconds(secondsForGame)
    }
    function calculateCurrentColumnAndRow(index, lengthOfLines) {
        let curLine = 0
        let curPosition = 0

        for (let i in lengthOfLines) {
            if (index >= lengthOfLines[i]) {
                index -= lengthOfLines[i]
                curLine += 1
            } else {
                curPosition = index
                break
            }
        }
        return [curPosition, curLine]
    }
    useEffect(() => {
        setPositionOfCursorInDatabase(roomId, 0, 0)
        clearResultsInDatabase(roomId)
        setLengthOfLines(calculateLengthOfLines(textRef))
        return interval.stop
    }, [])
    useEffect(()=>{
        console.log('users: '+users)
    },[users])
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
    },[text])
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
        if((roomId==='testRoom'||auth.currentUser.uid===roomId)&&!isStarted) {
            dispatch(toStart())
        }
        if(!(isStarted&&isAllowedKeyboardKey(e.key)))
            return

        function isAllowedKeyboardKey(key) {
            return (key.length === 1 && key.match(/[a-z]/i))
                || key === 'Backspace'
                || key === ' '
        }


        function BackspaceHandler() {
            if (index === 0) {
                return
            }
            index--
            curPosition--
            setMistakes(mistakes.filter(el => el < index))
            if (curPosition === -1) {
                curPosition = lengthOfLines[curLine]
                curLine--
            }
        }




        const keyboardCharacter = e.key
        let index = indexOfCurrentCharacter
        let [curPosition, curLine] = calculateCurrentColumnAndRow(index, lengthOfLines)


        if (keyboardCharacter === 'Backspace') {
            BackspaceHandler()
        } else {
            if (keyboardCharacter !== text[index]) {
                setMistakes([index, ...mistakes])
            }
            curPosition++
            index++
            if (curPosition === lengthOfLines[curLine]) {
                curPosition = 0
                curLine++
            }
        }
        setPositionOfCursorInDatabase(roomId, curLine, curPosition)
        setStyles(curLine, curPosition,cursorRef.current)
        setIndexOfCurrentCharacter(index)
    }

    return (
        <>
            <Timer
                playStartAnimation={mainState==='ROOM_TYPE'}
                seconds={seconds}
            />
            <div className={s.text__wrapper}>
                <div ref={usersCursors}>
                    {users&&users.map(user=> {
                            if (user.name !== name){
                                return <Fragment key={user.name}>
                                    <div style={{
                                        left: `${(user.curPosition) * 14.9 - 1}px`,
                                        top: `${(user.curLine) * 38 + 4}px`
                                    }} className={s.user__cursor}>
                                    </div>
                                    <p
                                        style={{
                                            left: `${(user.curPosition) * 14.9 + 5}px`,
                                            top: `${(user.curLine) * 38 - 10}px`
                                        }}
                                    >{user.name}</p>
                                </Fragment>
                            }

                        }
                        )}
                </div>
                <div ref={cursorRef} className={s.cursor}/>
                <p ref={textRef} className={s.text}>
                    {Array.from(text).map((character, id) =>
                        <span
                            className={`${id >= indexOfCurrentCharacter ? s.disabled__letter : ''} ${mistakes.includes(id) ? s.mistake__letter : ''}`}
                            key={id}>{character}
                        </span>
                    )}
                </p>
            </div>
        </>


    );
};

export default TextBox;