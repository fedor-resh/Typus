import {configureStore} from '@reduxjs/toolkit';
import {resultSliderReducer} from './resultSlider';
import {roomDataReducer} from './roomData';
export default configureStore({
    reducer:{
        result:resultSliderReducer,
        roomData:roomDataReducer
    }
})
