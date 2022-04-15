import {configureStore} from '@reduxjs/toolkit';

import {isTypingEndReducer} from './isTypingEndSlider';
import {resultSliderReducer} from './resultSlider';
import {roomDataReducer} from './roomData';
export default configureStore({
    reducer:{
        result:resultSliderReducer,
        isTypingEnd:isTypingEndReducer,
        roomData:roomDataReducer
    }
})
