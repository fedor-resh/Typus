import {createSlice} from '@reduxjs/toolkit';
import {auth, setResultsInDatabase} from '../Firebase/firebaseInit';

function countCorrectWords(text, mistakes) {
    let correct = 0
    let isCurrentWordCorrect = true
    Array.from(text).forEach((letter, index) => {
        if (mistakes.includes(index)) {
            isCurrentWordCorrect = false
        }
        if (letter === ' ' && isCurrentWordCorrect) {
            correct++
        }
    })
    return correct
}
const resultSlider = createSlice({
    name: 'result',
    initialState: {
        charPerMinute: 0,
        PercentageOfRight: 0,
        ball: 0
    }, reducers: {
        setResult: (state, action) => {
            let {roomId, seconds, mistakes, name, userId, text} = action.payload

            state.charPerMinute = Math.round(text.length / seconds * 60)
            state.PercentageOfRight = text.length>0?Math.round((1 - mistakes.length / text.length) * 100):0
            state.ball = text.length>0? Math.round(state.charPerMinute * state.PercentageOfRight / 100):0
            setResultsInDatabase(
                roomId,
                name,
                userId,
                state.charPerMinute,
                state.PercentageOfRight,
                state.ball
            )
        }
    }
})

export const {setResult} = resultSlider.actions

export const resultSliderReducer = resultSlider.reducer