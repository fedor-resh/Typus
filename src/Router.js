import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import TextBox from './Components/TextBox/TextBox';
import Home from './Pages/Home/Home';


const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='*' element={<Home/>}>
                        <Route exact path='*' element={<TextBox/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Router;