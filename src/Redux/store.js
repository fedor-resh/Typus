import {configureStore} from '@reduxjs/toolkit';
import {resultSliderReducer} from './resultSlider';
import {roomDataReducer} from './roomData';
import {userReducer} from './user';
export default configureStore({
    reducer:{
        user:userReducer,
        result:resultSliderReducer,
        roomData:roomDataReducer
    }
})
