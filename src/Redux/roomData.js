import {createSlice} from '@reduxjs/toolkit';
import {auth, database} from '../Firebase/firebaseInit';
import {generateRandomText} from '../utils';



const resultSlider = createSlice({
    name:'roomData',
    initialState:{
        roomId:'testRoom',
        text:'lorem ipsum dolor sit amet consectetur adipisicing elit accusamus consequuntur cum cumque cupiditate deserunt distinctio illum laboriosam nesciunt nulla obcaecati optio quidem reprehenderit saepe sed sunt veritatis voluptas voluptate voluptatibus',
        secondsForGame:30,
        mainState:'ROOM',//  ROOM||ROOM_TYPE||RESULTS
        language:'en', //en||ru
        amountOfWords:20,
        isEndTimeDependsOnTime:true
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
                mainState,
                amountOfWords:20,
                language:'en',
                isEndTimeDependsOnTime:true,
            })
        },
        setRoomData:(state,action)=>{
            const {roomId,text,secondsForGame,mainState,amountOfWords,language,isEndTimeDependsOnTime} = action.payload
            state.roomId = roomId
            state.text = text
            state.secondsForGame = secondsForGame
            state.mainState = mainState
            state.amountOfWords = amountOfWords
            state.language = language
            state.isEndTimeDependsOnTime = isEndTimeDependsOnTime
        },
        toRestartGame:(state)=>{
            state.text = generateRandomText(state.amountOfWords,state.language)
            state.mainState = 'ROOM'
            database.ref(state.roomId+'/roomSettings').update({
                text:state.text,
                mainState:'ROOM'
            })
        },
        updateRoomData:(state,action)=>{
            if(state.mainState==='ROOM_TYPE'||auth.currentUser.uid!==state.roomId)return
            const updated = action.payload
            const {secondsForGame,amountOfWords,language,isEndTimeDependsOnTime} = updated

            if(secondsForGame)state.secondsForGame = secondsForGame
            if(amountOfWords)state.amountOfWords = amountOfWords
            if(isEndTimeDependsOnTime !== undefined)state.isEndTimeDependsOnTime = isEndTimeDependsOnTime
            if(language)state.language = language

            if(language||amountOfWords)state.text = generateRandomText(state.amountOfWords,state.language)

            database.ref(state.roomId+'/roomSettings').update({
                ...updated,
                text:state.text
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

export const {setRoomData,updateRoomData,setNewRoomData,toResults,toStart,toRoom,toRestartGame} = resultSlider.actions

export const roomDataReducer = resultSlider.reducer