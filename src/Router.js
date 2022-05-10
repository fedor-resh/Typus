import React, {Suspense, lazy, useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Routes, useNavigate} from 'react-router-dom';
import Wrapper from './Pages/Wrapper/Wrapper';
import Main from './Pages/Main/Main';
import Error from './Components/Error/Error';
import ListOfRooms from './Pages/ListOfRooms/ListOfRooms';
import SignIn from './Components/SignIn/SignIn';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './Firebase/firebaseInit';
import {useSelector} from 'react-redux';


const Router = () => {
    const routes = [
        {
            isItNeedLogin: true,
            path: "/login",
            element: SignIn,
        },
        {
            path: "*",
            element: Wrapper,
            children: [
                {
                    path: "",
                    element:Main,
                },
                {
                    path: "rooms",
                    element:ListOfRooms,
                },
                {
                    path: "*",
                    element:Error,
                    massage:'404 page not found'
                },
            ],
        },
    ];
    // const createRoute = ({element, children, isItNeedLogin, path, ...props}) => {
    //     const Component = !isItNeedLogin ? withAuth(element) : element;
    //     return (
    //         <Route key={path} path={path} element={<Component {...props}/>}>
    //             {children && children.map(createRoute)}
    //         </Route>);
    // };
    // return (
    //         <Routes>
    //             {routes.map(createRoute)}
    //         </Routes>
    //
    // )
    return (

    <Routes>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='*' element={<Wrapper/>}>
            <Route path='' element={<Main/>}/>
            <Route path='rooms' element={<ListOfRooms/>}/>
            <Route path='*' element={<Error massage='Error 404'/>}/>
        </Route>
    </Routes>
);

};

export default Router;