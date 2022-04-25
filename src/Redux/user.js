import {createSlice} from '@reduxjs/toolkit';
import {auth, database, setResultsInDatabase} from '../Firebase/firebaseInit';
import {setThemeClass} from '../utils';


const user = createSlice({
    name: 'user',
    initialState: {
        name:'user',
        id:'testId',
        theme:'Ocean'
    }, reducers: {
        setNewUser:(state,action)=>{
            state.name = action.payload
            state.id = auth.currentUser.uid
            database.ref('users/' + state.id).set({
                name:state.name,
                theme:state.theme,
            })
        },
        setUser:(state,action)=>{
            state.id = action.payload.id ?? state.id
            state.name = action.payload.name ?? state.name
        },
        setTheme:(state,action)=>{
            state.theme = action.payload
            state.id = auth.currentUser.uid
            setThemeClass(state.theme)
            database.ref('users/' + state.id).update({
                theme:state.theme,
            })
        }
    }
})

export const {setUser,setNewUser,setTheme} = user.actions

export const userReducer = user.reducer