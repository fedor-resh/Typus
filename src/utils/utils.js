import {database, setUserInRoom} from '../Firebase/firebaseInit';
import {setRoomData} from '../Redux/roomData';

const russian = require('../russianWords.json');
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

function roomConnect(roomId, name = 'err', dispatch) {
    if (!roomId) return
    database.ref('rooms/' + roomId + '/roomSettings').on('value', (snapshot) => {
        const data = snapshot.val();
        dispatch(setRoomData({roomId: roomId, ...data}))
    })
    setUserInRoom(roomId, name)
}
export {generateRandomText,setThemeClass,roomConnect}