import React from 'react';
import Header from '../../Components/Header/Header';
import {Outlet} from 'react-router-dom'
import Footer from '../../Components/Footer/Footer';
import s from './Wrapper.module.css'

const Wrapper = () => {
    return (
        <div className={s.wrapper}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>

    );
};

export default Wrapper;