import React, {useEffect, useRef, useState} from 'react';
import s from './TextBox.module.css'
import '../../../fonts/robotomono.css'


const TextBox = () => {
    const [text, setText] = useState('lorem ipsum dolor sit amet consectetur adipisicing elit accusamus consequuntur cum cumque cupiditate deserunt distinctio illum laboriosam nesciunt nulla obcaecati optio quidem reprehenderit saepe sed sunt veritatis voluptas voluptate voluptatibus')
    const [indexOfCurrentCharacter, setIndexOfCurrentCharacter] = useState(0)
    const [lengthOfLines, setLengthOfLines] = useState([])
    const [mistakes, setMistakes] = useState([])
    const [timer, setTimer] = useState( 0 )
    const [flag , setFlag] = useState(true)


    useEffect(() => {
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
        console.log(LinesLength)
        setLengthOfLines(LinesLength)
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
        if (flag){
            setFlag(false)
            setTimer(new Date())
            console.log(timer.toLocaleString())
        }
        const keyboardCharacter = (String.fromCharCode(e.keyCode).toLowerCase())
        let index = indexOfCurrentCharacter

        let curLine = 0
        let curPosition = 0
        let copyIndex = index
        for (let i in lengthOfLines) {
            if (copyIndex >= lengthOfLines[i]) {
                copyIndex -= lengthOfLines[i]
                curLine += 1
            } else {
                curPosition = copyIndex
                break
            }
        }
        if (e.key === 'Backspace' ) {
            if(index === 0){return}
            index--
            curPosition--
            setMistakes(mistakes.filter(el => el < index))
            if (curPosition === -1) {
                curPosition = lengthOfLines[curLine]
                curLine--
            }

        } else {
            if (keyboardCharacter !== text[index]) {
                setMistakes([index, ...mistakes])
            }
            curPosition++
            if (curPosition === lengthOfLines[curLine]) {
                curPosition = 0
                curLine++
            }
            index++
        }
        if (text.length + 1 === index) {
            return
        }

        cursorRef.current.style.top = `${(curLine) * 38 + 28 + 20}px`
        cursorRef.current.style.left = `${(curPosition) * 14.9 - 1 + 20}px`
        setIndexOfCurrentCharacter(index)
    }

    return (
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
    );
};

export default TextBox;