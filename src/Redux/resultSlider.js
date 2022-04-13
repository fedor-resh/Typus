import {createSlice} from '@reduxjs/toolkit';

const resultSlider = createSlice({
    name:'result',
    initialState:{
        amountOfCharacters:0,
        seconds:0,
        amountOfMistakes:0
    },reducers:{
        setResult:(state,action)=>{
            state.amountOfCharacters = action.payload.amountOfCharacters
            state.seconds = action.payload.seconds
            state.amountOfMistakes = action.payload.amountOfMistakes
        }
    }
})

export const {setResult} = resultSlider.actions

export const resultSliderReducer = resultSlider.reducer