import {database, setUserInRoom} from '../Firebase/firebaseInit';
import {setDefaultRoomData, setRoomData} from '../Redux/roomData';
import russian from '../russianWords.json'
import english from '../englishWords.json'


function generateRandomText(amountOfCharacters, lang = 'en') {
    const languages = {
        ru: russian,
        en: english,
    }
    const words = languages[lang]
    let text = '';
    for (let i = 0; i < amountOfCharacters; i++) {
        text += ' ' + words[Math.floor(Math.random() * words.length)];
    }
    text = text.substring(1)

    return text
}

function setThemeClass(theme) {
    window.document.body.className = theme
}

function tryRoomConnect(roomId, user, dispatch) {
    if (!roomId) return
    database.ref('rooms/' + roomId + '/roomSettings').on('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) {
            dispatch(setDefaultRoomData())
            return
        }
        dispatch(setRoomData({roomId, ...data}))
    })
    setUserInRoom(roomId, user)
}

export {generateRandomText, setThemeClass, tryRoomConnect}