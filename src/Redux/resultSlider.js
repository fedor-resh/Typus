import {createSlice} from '@reduxjs/toolkit';
import {auth, setResultsInDatabase} from '../Firebase/firebaseInit';


const resultSlider = createSlice({
    name: 'result',
    initialState: {
        charPerMinute: 0,
        PercentageOfRight: 0,
        ball: 0
    }, reducers: {
        setResult: (state, action) => {
            let {roomId,amountOfCharacters, seconds, amountOfMistakes, name} = action.payload
            state.charPerMinute = amountOfCharacters / seconds * 60
            state.PercentageOfRight = amountOfCharacters>0?Math.round((1 - amountOfMistakes / amountOfCharacters) * 100):0
            state.ball = amountOfCharacters>0?Math.round((amountOfCharacters / seconds * 60)
                * (1 - amountOfMistakes / amountOfCharacters)):0
            setResultsInDatabase(
                roomId,
                name,
                auth.currentUser.uid,
                state.charPerMinute,
                state.PercentageOfRight,
                state.ball
            )
        }
    }
})

export const {setResult} = resultSlider.actions

export const resultSliderReducer = resultSlider.reducer