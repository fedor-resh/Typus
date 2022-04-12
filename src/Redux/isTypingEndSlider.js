import {createSlice} from '@reduxjs/toolkit';

const isTypingEndSlider = createSlice({
    name:'isTypingEnd',
    initialState:{
        value:false
    },reducers:{
        toEnd:state => {
            state.value = true
        },
        toStart:state => {
            state.value = false
        }
    }
})
export const {toEnd,toStart} = isTypingEndSlider.actions

export const isTypingEndReducer = isTypingEndSlider.reducer