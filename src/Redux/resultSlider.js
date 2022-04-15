import {createSlice} from '@reduxjs/toolkit';
import {auth, setResultsInDatabase} from '../Firebase/firebaseInit';


const resultSlider = createSlice({
    name:'result',
    initialState:{
        charPerMinute:0,
        PercentageOfRight:0,
        ball:0
    },reducers:{
        setResult:(state,action)=>{
            const {amountOfCharacters,seconds,amountOfMistakes} = action.payload
            state.charPerMinute = amountOfCharacters/seconds*60
            state.PercentageOfRight = Math.round((1 - amountOfMistakes/amountOfCharacters) * 100)
            state.ball = Math.round((amountOfCharacters/seconds*60)*(1 - amountOfMistakes/amountOfCharacters))
            setResultsInDatabase('testRoom',auth.currentUser.displayName.split(' ')[0],auth.currentUser.uid,state.charPerMinute,state.PercentageOfRight,state.ball)
        }
    }
})

export const {setResult} = resultSlider.actions

export const resultSliderReducer = resultSlider.reducer