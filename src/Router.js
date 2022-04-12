import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Wrapper from './Pages/Wrapper/Wrapper';
import Main from './Pages/Main/Main';


const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='*' element={<Wrapper/>}>
                        <Route exact path='' element={<Main/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Router;