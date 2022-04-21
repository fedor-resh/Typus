const russian = require('./russianWords.json');
const english = require('an-array-of-english-words')


function generateRandomText(amountOfCharacters,lang = 'ru'){
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

// function generateRandomText(amountOfCharacters:number,lang:'ru'|'en'):string{
//     const languages:{ru:any,en:any} = {
//         ru:russian,
//         en:english,
//     }
//     const words = languages[lang]
//     let text = '';
//     for (let i=0; i<amountOfCharacters; i++) {
//         text += ' ' + words[Math.floor(Math.random()*words.length)];
//     }
//     return text.substring(1)
// }
// console.log(generateRandomText(100,"ru"))
export {generateRandomText}