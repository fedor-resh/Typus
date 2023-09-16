import React, {useEffect} from 'react';
import Header from '../../Components/Header/Header';
import {Outlet, useNavigate} from 'react-router-dom'
import Footer from '../../Components/Footer/Footer';
import s from './Wrapper.module.css'
import {useDispatch, useSelector} from "react-redux";
import {ErrorBoundary} from "../../ErrorBaundary";
import {useUserSelector} from "../../Redux/reduxHooks";
import {connectToRoom} from "../../utils/utils";
import {setGuest, setUser} from "../../Redux/user";
import {setNewRoomData} from "../../Redux/roomData";
import {getRoomHash} from "../../utils/utils";
import {setUserInRoom} from "../../Firebase/firebaseInit";
import Popup from "../../Popup/Popup";
const Wrapper = () => {
    const {userId} = useUserSelector()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useUserSelector()
    useEffect(() => {
        if (user.userId === 'testId') return
        try{
            connectToRoom(getRoomHash(), user, dispatch)
        } catch (e) {
            dispatch(setNewRoomData({title:user.name,userId}))
            setUserInRoom(userId, user)
            const newUrl = window.location.origin + '?room=' + user.userId
            window.localStorage.setItem('user', JSON.stringify(user))
            window.history.pushState({path: newUrl}, '', newUrl);
        }
    }, [user]);
    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('user'))
        console.log(user)
        if (user) {
            dispatch(setUser(user))
        }
    }, [])

    return (
        <div className={s.wrapper}>
            {userId === 'testId'&&<Popup onSubmit={name => dispatch(setGuest(name))}/>}
            <Header/>
            <ErrorBoundary>
                <Outlet/>
            </ErrorBoundary>
            <Footer/>
        </div>

    );
};

export default Wrapper;