const words = require('an-array-of-english-words')
function generateRandomText(amountOfCharacters){
    let text = '';
    for (let i=0; i<amountOfCharacters; i++) {
        text += ' ' + words[Math.floor(Math.random()*words.length)];
    }
    return text.substring(1)
}
// console.log(words.slice(0,100))
export {generateRandomText}