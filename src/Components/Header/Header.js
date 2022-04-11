import React from 'react';
import  s from './Header.module.css'
import {Outlet} from 'react-router-dom'
import '../../fonts/fonts.css'

const Header = () => {
    return (
        <>
            <div className={s.header}>
                <div className={s.left__bar}>
                    <h1>rushtype</h1>
                </div>
                <div className={s.right__bar}>
                    <button>new room</button>
                </div>
            </div>
            <Outlet/>
        </>


);
};

export default Header;