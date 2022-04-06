import React, {useEffect, useRef, useState} from 'react';
import s from './TextBox.module.css'
import '../fonts/robotomono.css'


const TextBox = () => {
    const [text, setText] = useState('lorem ipsum dolor sit amet consectetur adipisicing elit accusamus consequuntur cum cumque cupiditate deserunt distinctio illum laboriosam nesciunt nulla obcaecati optio quidem reprehenderit saepe sed sunt veritatis voluptas voluptate voluptatibus')
    const [currentColumn, setCurrentColumn] = useState(0)
    const [indexOfCurrentCharacter, setIndexOfCurrentCharacter] = useState(0)
    const [currentLine, setCurrentLine] = useState(0)
    const [lengthOfLines, setLengthOfLines] = useState(0)

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
        console.log(LinesLength)
        setLengthOfLines(LinesLength)
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', keyboardHandler);
        return () => {
            window.removeEventListener('keydown', keyboardHandler)
        }
    }, [keyboardHandler])
    const cursorRef = useRef()
    const textRef = useRef()


    function keyboardHandler(e) {

        const keyboardCharacter = (String.fromCharCode(e.keyCode).toLowerCase())
        // console.log('current character: '+keyboardCharacter)
        // console.log('current in text: '+text[currentColumn], currentColumn)
        let curPosition = currentColumn
        let curLine = currentLine
        if (keyboardCharacter === text[indexOfCurrentCharacter]) {
            curPosition++
            if(curPosition === lengthOfLines[currentLine]){
                curPosition = 0
                curLine++
            }
            cursorRef.current.style.top = `${(curLine) * 38 + 28}px`
            cursorRef.current.style.left = `${(curPosition) * 14.9 - 1}px`
            setCurrentColumn(curPosition)
            setCurrentLine(curLine)
            setIndexOfCurrentCharacter(indexOfCurrentCharacter+1)
            // console.log(curPosition)
        }
    }

    return (
        <div className={s.text__wrapper}>
            <div ref={cursorRef} className={s.cursor}/>
            <p ref={textRef} className={s.text}>
                {Array.from(text).map((character,id)=>
                    <letter className={id>=indexOfCurrentCharacter?s.disabled__letter:''} key={id}>{character}</letter>
                )}
            </p>
        </div>
    );
};

export default TextBox;