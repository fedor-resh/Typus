export function calculateLengthOfLines(textRef) {
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
export function setStyles(curLine, curPosition, cursorRef) {
    if(cursorRef){
        cursorRef.style.top = `${(curLine) * 38 + 4}px`
        cursorRef.style.left = `${(curPosition) * 14.9 - 1}px`
    }
}
export function calculateCurrentColumnAndRow(index, lengthOfLines) {
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
export function isAllowedKeyboardKey(key) {
    return (key.length === 1)
        || key === 'Backspace'
        || key === ' '
}
export function isUnderline(id,character,lengthOfLines,mistakes) {
    return mistakes.includes(id)
        &&character===' '
        &&calculateCurrentColumnAndRow(id+1,lengthOfLines)[0] !== 0
}