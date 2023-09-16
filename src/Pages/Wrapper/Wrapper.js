import React, {useEffect} from 'react';
import Header from '../../Components/Header/Header';
import {Outlet, useNavigate} from 'react-router-dom'
import Footer from '../../Components/Footer/Footer';
import s from './Wrapper.module.css'
import {useDispatch, useSelector} from "react-redux";
import {ErrorBoundary} from "../../ErrorBaundary";
import {useUserSelector} from "../../Redux/reduxHooks";
import {tryRoomConnect} from "../../utils/utils";
import {setGuest} from "../../Redux/user";
import {setNewRoomData} from "../../Redux/roomData";
import {getRoomHash} from "../../utils/utils";
import {setUserInRoom} from "../../Firebase/firebaseInit";
const Wrapper = () => {
    const {userId} = useUserSelector()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useUserSelector()
    useEffect(() => {
        if (user.userId === 'testId') return
        if(getRoomHash()) {
            tryRoomConnect(getRoomHash(), user, dispatch)
        } else {
            dispatch(setNewRoomData({title:user.name,userId}))
            setUserInRoom(userId, user)
            const newUrl = window.location.origin + '?room=' + user.userId
            window.history.pushState({path: newUrl}, '', newUrl);
        }
    }, [user]);
    useEffect(() => {
        if (userId === 'testId') {
            const name = prompt('enter name:', 'name')
            dispatch(setGuest(name))
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