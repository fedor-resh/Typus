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
    const {id} = useSelector((state) => state.user)
    const navigate = useNavigate()
    const withAuth = (Component) => {
        return (props) => {
            if (id === 'testId') {
                navigate('/login', {replace: true})
            }
            return <Component {...props} />;
        };
    };
    useEffect(() => {
        if (window.innerWidth < 850) {
            alert('this app dont work right on this width of screen')
        }
    }, [])
    const routes = [
        {
            isItNeedLogin: true,
            path: "/login",
            element: lazy(() => import("./Components/SignIn/SignIn")),
        },
        {
            path: "*",
            element: lazy(() => import("./Pages/Wrapper/Wrapper")),
            children: [
                {
                    path: "",
                    element: lazy(() => import("./Pages/Main/Main")),
                },
                {
                    path: "rooms",
                    element: lazy(() => import("./Pages/ListOfRooms/ListOfRooms")),
                },
                {
                    path: "*",
                    element: lazy(() => import("./Components/Error/Error")),
                    massage:'404 page not found'
                },
            ],
        },
    ];
    const createRoute = ({element, children, isItNeedLogin, path, ...props}) => {
        const Component = !isItNeedLogin ? withAuth(element) : element;
        return (
            <Route key={path} path={path} element={<Component {...props}/>}>
                {children && children.map(createRoute)}
            </Route>);
    };
    return (
        <Suspense fallback={<p>loading</p>}>
            <Routes>
                {routes.map(createRoute)}
            </Routes>
        </Suspense>

    )

};
// return (
//     <Routes>
//         <Route path='/login' element={<SignIn/>}/>
//         <Route path='*' element={<Wrapper/>}>
//             <Route path='' element={<Main/>}/>
//             <Route path='rooms' element={<ListOfRooms/>}/>
//             <Route path='*' element={<Error massage='Error 404'/>}/>
//         </Route>
//     </Routes>
// );
export default Router;