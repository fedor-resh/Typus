import {configureStore} from '@reduxjs/toolkit';

import {isTypingEndReducer} from './isTypingEndSlider';
export default configureStore({
    reducer:{
        isTypingEnd:isTypingEndReducer
    }
})