import {createSlice} from '@reduxjs/toolkit';
import {auth, database} from '../Firebase/firebaseInit';
import {generateRandomText} from '../utils/utils';


const resultSlider = createSlice({
    name: 'roomData',
    initialState: {
        roomId: 'testRoom',
        text: 'lorem ipsum dolor sit amet consectetur adipisicing elit accusamus consequuntur cum cumque cupiditate deserunt distinctio illum laboriosam nesciunt nulla obcaecati optio quidem reprehenderit saepe sed sunt veritatis voluptas voluptate voluptatibus',
        secondsForGame: 30,
        mainState: 'ROOM',//  ROOM||ROOM_TYPE||RESULTS
        language: 'en', //en||ru
        amountOfWords: 20,
        isEndTimeDependsOnTime: true,
        title:'defaultTitle',
    }, reducers: {
        setDefaultRoomData: (state) => {
            state.roomId = 'testRoom'
            state.text = 'lorem ipsum dolor sit amet consectetur adipisicing elit accusamus consequuntur cum cumque cupiditate deserunt distinctio illum laboriosam nesciunt nulla obcaecati optio quidem reprehenderit saepe sed sunt veritatis voluptas voluptate voluptatibus'
            state.secondsForGame = 30
            state.mainState = 'ROOM'//  ROOM||ROOM_TYPE||RESULTS
            state.language = 'en' //en||ru
            state.amountOfWords = 20
            state.isEndTimeDependsOnTime = true
            state.title = 'defaultTitle'
        },
        setNewRoomData: (state) => {
            state.roomId = auth.currentUser.uid
            state.text = generateRandomText(20, 'en')
            state.secondsForGame = 30
            state.mainState = 'ROOM'
            state.title = state.roomId
            database.ref('rooms/' + state.roomId + '/roomSettings').set({
                // roomId:auth.currentUser.uid,
                title:state.roomId,
                text: state.text,
                secondsForGame: state.secondsForGame,
                mainState: state.mainState,
                amountOfWords: 20,
                language: 'en',
                isEndTimeDependsOnTime: true,
            })
            database.ref('rooms/' + state.roomId)
                .onDisconnect()
                .remove()
                .catch(alert)
        },
        setRoomData: (state, action) => {
            const {
                roomId,
                text,
                secondsForGame,
                mainState,
                amountOfWords,
                language,
                isEndTimeDependsOnTime
            } = action.payload
            state.roomId = roomId
            state.text = text
            state.secondsForGame = secondsForGame
            state.mainState = mainState
            state.amountOfWords = amountOfWords
            state.language = language
            state.isEndTimeDependsOnTime = isEndTimeDependsOnTime
        },
        toRestartGame: (state) => {
            state.text = generateRandomText(state.amountOfWords, state.language)
            state.mainState = 'ROOM'
            database.ref('rooms/' + state.roomId + '/roomSettings').update({
                text: state.text,
                mainState: 'ROOM'
            })
        },
        updateRoomData: (state, action) => {
            if (state.mainState === 'ROOM_TYPE' || auth.currentUser.uid !== state.roomId) return
            const updated = action.payload
            const {secondsForGame, amountOfWords, language, isEndTimeDependsOnTime} = updated

            if (secondsForGame) state.secondsForGame = secondsForGame
            if (amountOfWords) state.amountOfWords = amountOfWords
            if (isEndTimeDependsOnTime !== undefined) state.isEndTimeDependsOnTime = isEndTimeDependsOnTime
            if (language) state.language = language

            if (language || amountOfWords) state.text = generateRandomText(state.amountOfWords, state.language)

            database.ref('rooms/' + state.roomId + '/roomSettings').update({
                ...updated,
                text: state.text
            })
        },
        toResults: state => {
            state.mainState = 'RESULTS'
            database.ref('rooms/' + state.roomId + '/roomSettings').update({
                mainState: 'RESULTS'
            })
        },
        toRoom: state => {
            state.mainState = 'ROOM'
            database.ref('rooms/' + state.roomId + '/roomSettings').update({
                mainState: 'ROOM'
            })
        },
        toStart: state => {
            state.mainState = 'ROOM_TYPE'
            database.ref('rooms/' + state.roomId + '/roomSettings').update({
                mainState: 'ROOM_TYPE'
            })
        }
    }
})

export const {
    setRoomData,
    updateRoomData,
    setNewRoomData,
    toResults,
    toStart,
    toRoom,
    toRestartGame,
    setDefaultRoomData
} = resultSlider.actions

export const roomDataReducer = resultSlider.reducer