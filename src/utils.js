const words = require('an-array-of-english-words')
function generateRandomText(amountOfCharacters){
    let text = '';
    for (let i=0; i<50; i++) {
        text += ' ' + words[Math.floor(Math.random()*words.length)];
    }
    return text.substring(1)
}
export {generateRandomText}