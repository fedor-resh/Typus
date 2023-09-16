import React, {useEffect, useRef, useState} from 'react';
import s from './Header.module.css'
import {ReactComponent as Keyboard} from '../../svg/keyboard.svg'
import {ReactComponent as Chat} from '../../svg/chat.svg'
import {ReactComponent as Profile} from '../../svg/profil.svg'
import {ReactComponent as Information} from '../../svg/information.svg'
import {ReactComponent as Settings} from '../../svg/settings.svg'
import {ReactComponent as Copy} from '../../svg/copy-link 1.svg'
import {ReactComponent as Web} from '../../svg/web.svg'
import {ReactComponent as Lock} from '../../svg/locked.svg'
import {useDispatch, useSelector} from 'react-redux';
import {setDefaultRoomData, setNewRoomData, updateRoomData} from '../../Redux/roomData';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, setUserInRoom} from '../../Firebase/firebaseInit';
import {signOut} from 'firebase/auth'
import {generateRandomText, tryRoomConnect} from '../../utils/utils';
import {clearUserSettings, setUser} from '../../Redux/user';
import {useNavigate} from 'react-router-dom';

const Header = () => {

    const {roomId, secondsForGame, language, isEndDependsOnTime, mainState,amountOfWords} = useSelector(state => state.roomData.value)
    const {name,userId} = useSelector(state => state.user)
    const linkRef = useRef(null)
    const link = window.location.origin + '?room=' + roomId
    const navigate = useNavigate();


    async function copyHandler() {
        await navigator.clipboard.writeText(link);
    }
    const dispatch = useDispatch()
    function setNewRoom() {
        dispatch(setNewRoomData({title:name,userId}))
        // setUserInRoom(roomId, name)
        tryRoomConnect(userId,{name,userId},dispatch)
    }

    function signOutHandler() {
        signOut(auth).catch(err => alert(err))
        // dispatch(setUser({name:'user'}))
        dispatch(setDefaultRoomData())
        dispatch(clearUserSettings())
        navigate('/login')
    }
    useEffect(() => {
        if (roomId==='testRoom' && userId!=='testId') {
            setNewRoom()
            console.log('set new room')
        }
    },[])
    return (<header className={s.header}>

        <div className={s.top}>
            <div className={s.flex}>

                <div className={s.left__bar}>
                    <h1>typus</h1>
                    <Keyboard onClick={() => navigate(mainState==='RESULTS'?'/results':'/')}/>
                    <Web onClick={() => navigate('/rooms')}/>
                    <Settings className={s.settings} onClick={() => navigate('/settings')}/>
                    <Information/>
                    <Profile onClick={signOutHandler}/>
                    <p className={s.user__name}>{name}</p>
                </div>
            </div>
            <div className={s.right__bar}>
                {roomId !== 'testRoom' ? <><p ref={linkRef} onClick={copyHandler}>copy invite link</p><Copy/></> :
                    <button onClick={setNewRoom}>new room</button>}
            </div>

        </div>

        <div className={`${s.settings} ${userId === roomId ? s.isAuth : ''}`}>
            <div>
                <span className={language === 'en' ? s.selected : ''}
                      onClick={() => dispatch(updateRoomData({language: 'en',userId}))}>english</span>
                <span className={language === 'ru' ? s.selected : ''}
                      onClick={() => dispatch(updateRoomData({language: 'ru',userId}))}>russian</span>
                {/*<Lock className={s.lock}/>*/}
            </div>
            <div>
                {['words', 'timer'].map(mode => (
                    <span
                        key={mode}
                        className={isEndDependsOnTime === (mode !== 'words') ? s.selected : ''}
                        onClick={() => dispatch(updateRoomData({
                            isEndDependsOnTime: (mode !== 'words'),userId
                        }))}>{mode}</span>
                ))}
            </div>
            <div>
                {isEndDependsOnTime?[15, 30, 60, 120].map(sec => (
                    <span
                        key={sec}
                        className={secondsForGame === sec ? s.selected : ''}
                        onClick={() => dispatch(updateRoomData({secondsForGame: sec,userId}))}
                    >{sec}</span>
                )):[10, 20, 30, 40].map(words => (
                    <span
                        key={words}
                        className={amountOfWords === words ? s.selected : ''}
                        onClick={() => dispatch(updateRoomData({amountOfWords: words,userId}))}
                    >{words}</span>
                ))}
            </div>
        </div>
    </header>);
};

export default Header;