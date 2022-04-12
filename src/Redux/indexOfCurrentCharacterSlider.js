import {createSlice} from '@reduxjs/toolkit';

export const indexOfCurrentCharacterSlider = createSlice({
    name:'indexOfCurrentCharacter',
    initialState:{
        value:0
    },
    reducers:{
        increment:(state) => {
            state.value+=1
        }
    }
})

export const {increment} = indexOfCurrentCharacterSlider.actions

export default indexOfCurrentCharacterSlider.reducer