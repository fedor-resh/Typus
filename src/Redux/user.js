import {createSlice} from '@reduxjs/toolkit';
import {auth, database, setResultsInDatabase} from '../Firebase/firebaseInit';
import {setThemeClass} from '../utils/utils';


const user = createSlice({
    name: 'user',
    initialState: {
        name:'—',
        userId:'testId',
        theme:'Ocean'
    }, reducers: {
        setNewUser:(state,action)=> {
            state.name = action.payload
            state.userId = auth.currentUser.uid
            database.ref('users/' + state.userId).set({
                name: state.name,
                theme: state.theme,
            })
        },
        setGuest:(state,action)=>{
            state.name = action.payload
            const hash = 'guest'+Math.round(Math.random()*10000000)
            state.userId = hash
        },
        setUser:(state,action)=>{
            state.userId = action.payload.userId ?? state.userId
            state.name = action.payload.name ?? 'err'
            setThemeClass(action.payload.theme)
        },
        setTheme:(state,action)=>{
            state.theme = action.payload
            setThemeClass(state.theme)
            database.ref('users/' + state.userId).update({
                theme:state.theme,
            })
            // database.ref('users/' + state.userId).onDisconnect()
        },
        clearUserSettings:(state)=>{
            state.name = ''
            state.userId = 'testId'
        }
    }
})

export const {setUser,setNewUser,setTheme,clearUserSettings,setGuest} = user.actions

export const userReducer = user.reducer