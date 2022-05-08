import React, {useRef, useState} from 'react';
import s from './Header.module.css'
import {ReactComponent as Keyboard} from '../../svg/keyboard.svg'
import {ReactComponent as Chat} from '../../svg/chat.svg'
import {ReactComponent as Profile} from '../../svg/profil.svg'
import {ReactComponent as Information} from '../../svg/information.svg'
import {ReactComponent as Settings} from '../../svg/settings.svg'
import {ReactComponent as Copy} from '../../svg/copy-link 1.svg'
import {ReactComponent as Web} from '../../svg/web.svg'
import {useDispatch, useSelector} from 'react-redux';
import {setDefaultRoomData, setNewRoomData, updateRoomData} from '../../Redux/roomData';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, setUserInRoom} from '../../Firebase/firebaseInit';
import {signOut} from 'firebase/auth'
import {generateRandomText} from '../../utils/utils';
import {clearUserSettings, setUser} from '../../Redux/user';
import {useNavigate} from 'react-router-dom';

const Header = () => {

    const {roomId, secondsForGame, language, isEndTimeDependsOnTime} = useSelector(state => state.roomData.value)
    const name = useSelector(state => state.user.name)
    const linkRef = useRef(null)
    const link = `https://www.typus.ga#${roomId}`
    const navigate = useNavigate();

    async function copyHandler() {
        await navigator.clipboard.writeText(link);
    }

    const dispatch = useDispatch()

    function setNewRoom() {
        dispatch(setNewRoomData(name))
        setUserInRoom(roomId, name)
    }

    function signOutHandler() {
        signOut(auth).catch(err => alert(err))
        // dispatch(setUser({name:'user'}))
        dispatch(setDefaultRoomData())
        dispatch(clearUserSettings())
    }

    return (<header className={s.header}>

        <div className={s.top}>
            <div className={s.flex}>

                <div className={s.left__bar}>
                    <h1>typus</h1>
                    <Keyboard onClick={() => navigate('/')}/>
                    <Web onClick={() => navigate('/rooms')}/>
                    <Settings className={s.settings}/>
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

        <div className={`${s.settings} ${auth.currentUser?.uid === roomId ? s.isAuth : ''}`}>
            <div>
                <span className={language === 'en' ? s.selected : ''}
                      onClick={() => dispatch(updateRoomData({language: 'en'}))}>english</span>
                <span className={language === 'ru' ? s.selected : ''}
                      onClick={() => dispatch(updateRoomData({language: 'ru'}))}>russian</span>
            </div>
            <div>
                {['words', 'timer'].map(mode => (
                    <span
                        key={mode}
                        className={isEndTimeDependsOnTime === (mode !== 'words') ? s.selected : ''}
                        onClick={() => dispatch(updateRoomData({isEndTimeDependsOnTime: (mode !== 'words')}))}>{mode}</span>
                ))}
            </div>
            <div>
                {[15, 30, 60, 120].map(sec => (
                    <span
                        key={sec}
                        className={secondsForGame === sec ? s.selected : ''}
                        onClick={() => dispatch(updateRoomData({secondsForGame: sec}))}
                    >{sec}</span>
                ))}

            </div>
        </div>
    </header>);
};

export default Header;