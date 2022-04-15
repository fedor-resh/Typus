import {createSlice} from '@reduxjs/toolkit';
import {database} from '../Firebase/firebaseInit';


const resultSlider = createSlice({
    name:'roomData',
    initialState:{
        roomId:'testRoom',
        text:'lorem ipsum dolor sit amet consectetur adipisicing elit accusamus consequuntur cum cumque cupiditate deserunt distinctio illum laboriosam nesciunt nulla obcaecati optio quidem reprehenderit saepe sed sunt veritatis voluptas voluptate voluptatibus',
        secondsForGame:30,
        mainState:'ROOM',

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
            console.log({roomId,text,secondsForGame,mainState})
        },
        toResults:state => {
            state.mainState = 'RESULTS'
        },
        toRoom:state => {
            state.mainState = 'ROOM'
        },
        toStart:state => {
            state.mainState = 'ROOM_TYPE'
        }
    }
})

export const {setRoomData,setNewRoomData,toResults,toStart,toRoom} = resultSlider.actions

export const roomDataReducer = resultSlider.reducer