import React, {useEffect} from 'react';
import Header from '../../Components/Header/Header';
import {Outlet, useNavigate} from 'react-router-dom'
import Footer from '../../Components/Footer/Footer';
import s from './Wrapper.module.css'
import {useSelector} from "react-redux";
import {ErrorBoundary} from "../../ErrorBaundary";
import {useUserSelector} from "../../Redux/reduxHooks";

const Wrapper = () => {
    const {userId} = useUserSelector()
    const navigate = useNavigate()
    useEffect(() => {
        if (userId === 'testId') {
            navigate('/login' + window.location.hash, {replace: true})
        }
    }, [])

    return (
        <div className={s.wrapper}>
            <Header/>
            <ErrorBoundary>
                <Outlet/>
            </ErrorBoundary>
            <Footer/>
        </div>

    );
};

export default Wrapper;