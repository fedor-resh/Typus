const russian = require('./russianWords.json');
const english = require('an-array-of-english-words')


function generateRandomText(amountOfCharacters,lang = 'en'){
    const languages = {
        ru:russian,
        en:english,
    }
    const words = languages[lang]
    let text = '';
    for (let i=0; i<amountOfCharacters; i++) {
        text += ' ' + words[Math.floor(Math.random()*words.length)];
    }
    return text.substring(1)
}
function setThemeClass(theme) {
    window.document.body.className = theme
}
export {generateRandomText,setThemeClass}