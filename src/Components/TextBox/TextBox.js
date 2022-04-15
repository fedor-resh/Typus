import React, {useEffect, useRef, useState} from 'react';
import s from './TextBox.module.css'
import '../../fonts/fonts.css'
import {useDispatch} from 'react-redux';
import {toEnd} from '../../Redux/isTypingEndSlider';
import Timer from '../Timer/Timer';
import {useInterval} from '@mantine/hooks';
import {setResult} from '../../Redux/resultSlider';
import {clearResultsInDatabase} from '../../Firebase/firebaseInit';


const TextBox = () => {
    const [text, setText] = useState('lorem ipsum dolor sit amet consectetur adipisicing elit accusamus consequuntur cum cumque cupiditate deserunt distinctio illum laboriosam nesciunt nulla obcaecati optio quidem reprehenderit saepe sed sunt veritatis voluptas voluptate voluptatibus')
    const [indexOfCurrentCharacter, setIndexOfCurrentCharacter] = useState(0)
    const [lengthOfLines, setLengthOfLines] = useState([])
    const [mistakes, setMistakes] = useState([])

    const [seconds, setSeconds] = useState(3)


    const dispatch = useDispatch()
    const interval = useInterval(() => setSeconds(s => s - 1), 1000);

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
            amountOfCharacters: indexOfCurrentCharacter,
            seconds: 30,
            amountOfMistakes: mistakes.length
        }))
        dispatch(toEnd())
    }

    useEffect(() => {
        if (!seconds) {
            endHandler()
        }
    }, [seconds])

    useEffect(() => {
        clearResultsInDatabase('testRoom')
        setLengthOfLines(calculateLengthOfLines(textRef))
        return interval.stop
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', keyboardHandler);
        return () => {
            window.removeEventListener('keydown', keyboardHandler)
        }
    }, [keyboardHandler])

    const cursorRef = useRef(null)
    const textRef = useRef(null)

    function keyboardHandler(e) {
        interval.start()

        function isAllowedKeyboardKey(key) {
            return (key.length === 1 && key.match(/[a-z]/i))
                || key === 'Backspace'
                || key === ' '
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

        function setStyles(curLine, curPosition) {
            cursorRef.current.style.top = `${(curLine) * 38 + 4}px`
            cursorRef.current.style.left = `${(curPosition) * 14.9 - 1}px`
        }

        if (!isAllowedKeyboardKey(e.key)) return


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
        // if (text.length + 1 === index) {
        //     dispatch(toEnd())
        //     return
        // }
        // console.log(`${e.key},index ${index},column ${curPosition}, row ${curLine}`)

        setStyles(curLine, curPosition)
        setIndexOfCurrentCharacter(index)
    }

    return (
        <>
            <Timer
                seconds={seconds}
            />
            <div className={s.text__wrapper}>
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