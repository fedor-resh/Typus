import {createSlice} from '@reduxjs/toolkit';
import {auth, database, setResultsInDatabase} from '../Firebase/firebaseInit';


const user = createSlice({
    name: 'user',
    initialState: {
        name:'user',
        id:'testId'
    }, reducers: {
        setUserInDatabase:(state,action)=>{
            state.name = action.payload
            state.id = auth.currentUser.uid
            database.ref('users/' + state.id).set({
                name:state.name,
            })
        },
        setUser:(state,action)=>{
            state.id = action.payload.id
            state.name = action.payload.name

        }

    }
})

export const {setUser,setUserInDatabase} = user.actions

export const userReducer = user.reducer