import {createSlice} from '@reduxjs/toolkit';


const resultSlider = createSlice({
    name:'roomData',
    initialState:{
        data:[]
    },reducers:{
        setRoomData:(state,action)=>{
            state.data = action.payload
            console.log(state.data)
        }
    }
})

export const {setRoomData} = resultSlider.actions

export const roomDataReducer = resultSlider.reducer