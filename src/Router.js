import React, {Suspense, lazy, useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Routes, useNavigate} from 'react-router-dom';
import Wrapper from './Pages/Wrapper/Wrapper';
import Error from './UI/Error/Error';
import ListOfRooms from './Pages/ListOfRooms/ListOfRooms';
import SignIn from './Components/SignIn/SignIn';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './Firebase/firebaseInit';
import {useSelector} from 'react-redux';
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import TextBox from "./Pages/TextBox/TextBox";
import Results from "./Pages/Results/Results";


const Router = () => {
    return (
    <Routes>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='*' element={<Wrapper/>}>
            <Route path='' element={<TextBox/>}/>
            <Route path='results' element={<Results/>}/>
            <Route path='rooms' element={<ListOfRooms/>}/>
            <Route path='settings' element={<SettingsPage/>}/>
            <Route path='*' element={<Error massage='Error 404'/>}/>
        </Route>
    </Routes>
);
};

export default Router;