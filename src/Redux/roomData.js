import {createSlice} from '@reduxjs/toolkit';
import {database} from '../Firebase/firebaseInit';
import {generateRandomText} from '../utils';


const resultSlider = createSlice({
    name:'roomData',
    initialState:{
        roomId:'testRoom',
        text:'lorem ipsum dolor sit amet consectetur adipisicing elit accusamus consequuntur cum cumque cupiditate deserunt distinctio illum laboriosam nesciunt nulla obcaecati optio quidem reprehenderit saepe sed sunt veritatis voluptas voluptate voluptatibus',
        secondsForGame:30,
        mainState:'ROOM',//  ROOM||ROOM_TYPE||RESULTS
    },reducers:{
        setNewRoomData:(state,action)=>{
            const {roomId,text,secondsForGame,mainState} = action.payload
            state.roomId = roomId
            state.text = text
            state.secondsForGame = secondsForGame
            state.mainState = mainState
            database.ref(roomId+'/roomSettings').set({
                text,
                secondsForGame,
                mainState
            })
        },
        setRoomData:(state,action)=>{
            const {roomId,text,secondsForGame,mainState} = action.payload
            state.roomId = roomId
            state.text = text
            state.secondsForGame = secondsForGame
            state.mainState = mainState
            // console.log({roomId,text,secondsForGame,mainState})
        },
        toRestartGame:(state,action)=>{
            // const {text,secondsForGame} = action.payload
            const amountOfWords = prompt('amountOfWords: ', '40')
            const secondsForGame = prompt('secondsForGame: ', '30')
            state.text = generateRandomText(amountOfWords ?? 20)
            state.secondsForGame = secondsForGame ?? 30
            state.mainState = 'ROOM'
            database.ref(state.roomId+'/roomSettings').update({
                text:state.text,
                secondsForGame:state.secondsForGame,
                mainState:'ROOM'
            })
        },
        toResults:state => {
            state.mainState = 'RESULTS'
            database.ref(state.roomId+'/roomSettings').update({
                mainState:'RESULTS'
            })
        },
        toRoom:state => {
            state.mainState = 'ROOM'
            database.ref(state.roomId+'/roomSettings').update({
                mainState:'ROOM'
            })
        },
        toStart:state => {
            state.mainState = 'ROOM_TYPE'
            database.ref(state.roomId+'/roomSettings').update({
                mainState:'ROOM_TYPE'
            })
        }
    }
})

export const {setRoomData,setNewRoomData,toResults,toStart,toRoom,toRestartGame} = resultSlider.actions

export const roomDataReducer = resultSlider.reducer