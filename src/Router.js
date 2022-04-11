import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './Components/Header/Header';
import TextBox from './Components/TextBox/TextBox';


const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Header/>}>
                        {/*<Route path='*' element={<h1>--------</h1>}/>*/}
                        <Route exact path='/' element={<TextBox/>}/>

                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Router;