import {configureStore} from '@reduxjs/toolkit';

import {isTypingEndReducer} from './isTypingEndSlider';
import {resultSliderReducer} from './resultSlider';
export default configureStore({
    reducer:{
        result:resultSliderReducer,
        isTypingEnd:isTypingEndReducer
    }
})