import {createSlice} from '@reduxjs/toolkit';

const resultSlider = createSlice({
    name:'result',
    initialState:{
        amountOfCharacters:0,
        time:0
    },reducers:{
        setResult:(state,amount)=>{
            state.amountOfCharacters = amount.payload
        }
    }
})

export const {setResult} = resultSlider.actions

export const resultSliderReducer = resultSlider.reducer