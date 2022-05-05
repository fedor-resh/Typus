import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Wrapper from './Pages/Wrapper/Wrapper';
import Main from './Pages/Main/Main';
import Error from './Components/Error/Error';
import ListOfRooms from './Pages/ListOfRooms/ListOfRooms';


const Router = () => {
    return (
        <div className='background'>
            <BrowserRouter>
                <Routes>
                    <Route path='*' element={<Wrapper/>}>
                        <Route path='' element={<Main/>}/>
                        <Route path='rooms' element={<ListOfRooms/>} />
                        <Route path='*' element={<Error massage='Error 404'/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Router;