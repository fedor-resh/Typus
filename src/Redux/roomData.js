import {createSlice} from '@reduxjs/toolkit';
import {auth, database} from '../Firebase/firebaseInit';
import {generateRandomText} from '../utils/utils';

const initialState = {
    roomId: 'testRoom',
    text: 'lorem ipsum dolor sit amet consectetur adipisicing elit accusamus consequuntur cum cumque cupiditate deserunt distinctio illum laboriosam nesciunt nulla obcaecati optio quidem reprehenderit saepe sed sunt veritatis voluptas voluptate voluptatibus',
    secondsForGame: 30,
    mainState: 'ROOM',//  ROOM||ROOM_TYPE||RESULTS
    language: 'en', //en||ru
    amountOfWords: 20,
    isEndTimeDependsOnTime: true,
    title:'defaultTitle',
    password:'',
}
const resultSlider = createSlice({
    name: 'roomData',
    initialState:{
        value:initialState
    },
    reducers: {
        setDefaultRoomData: (state) => {
            state.value = initialState
        },
        setNewRoomData: (state,action) => {
            state.value = {
                ...state.value,
                roomId:auth.currentUser.uid,
                text:generateRandomText(20, 'en'),
                secondsForGame:30,
                mainState:'ROOM',
                title:action.payload,
            }
            database.ref('rooms/' + state.value.roomId + '/roomSettings').set({
                ...state.value
            })
            database.ref('rooms/' + state.value.roomId)
                .onDisconnect()
                .remove()
                .catch(alert)
        },
        setRoomData: (state, action) => {
            state.value = action.payload
        },
        toRestartGame: (state) => {
            state.value.text = generateRandomText(state.value.amountOfWords, state.value.language)
            state.value.mainState = 'ROOM'
            database.ref('rooms/' + state.value.roomId + '/roomSettings').update({
                text: state.value.text,
                mainState: 'ROOM'
            })
        },
        updateRoomData: (state, action) => {
            if (state.value.mainState === 'ROOM_TYPE' || auth.currentUser.uid !== state.value.roomId) return

            if(action.payload.language) {
                state.value.text = generateRandomText(state.value.amountOfWords, state.value.language)
            }
            state.value = {
                ...state.value,
                ...action.payload
            }

            database.ref('rooms/' + state.value.roomId + '/roomSettings').update({
                ...action.payload,
                text: state.value.text
            })
        },
        toResults: state => {
            state.value.mainState = 'RESULTS'
            database.ref('rooms/' + state.value.roomId + '/roomSettings').update({
                mainState: 'RESULTS'
            })
        },
        toRoom: state => {
            state.value.mainState = 'ROOM'
            database.ref('rooms/' + state.value.roomId + '/roomSettings').update({
                mainState: 'ROOM'
            })
        },
        toStart: state => {
            state.value.mainState = 'ROOM_TYPE'
            database.ref('rooms/' + state.value.roomId + '/roomSettings').update({
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