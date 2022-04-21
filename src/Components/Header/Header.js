import React, {useRef, useState} from 'react';
import s from './Header.module.css'
import {ReactComponent as Keyboard} from '../../svg/keyboard.svg'
import {ReactComponent as Chat} from '../../svg/chat.svg'
import {ReactComponent as Profile} from '../../svg/profil.svg'
import {ReactComponent as Information} from '../../svg/information.svg'
import {ReactComponent as Settings} from '../../svg/settings.svg'
import {ReactComponent as Copy} from '../../svg/copy-link 1.svg'
import {useDispatch, useSelector} from 'react-redux';
import {setNewRoomData, updateRoomData} from '../../Redux/roomData';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, setUserInRoom} from '../../Firebase/firebaseInit';
import {signOut} from 'firebase/auth'
import {generateRandomText} from '../../utils';
import {setUser} from '../../Redux/user';

const Header = () => {

    const roomId = useSelector(state=> state.roomData.roomId)
    const secondsForGame = useSelector(state=> state.roomData.secondsForGame)
    const language = useSelector(state=> state.roomData.language)
    const amountOfWords = useSelector(state=> state.roomData.amountOfWords)
    const isEndTimeDependsOnTime = useSelector(state=> state.roomData.isEndTimeDependsOnTime)
    const name = useSelector(state=> state.user.name)

    const linkRef = useRef(null)

    const link = `https://react-keyboard-runner.vercel.app#${roomId}`

    async function copyHandler() {
        await navigator.clipboard.writeText(link);
    }
    const dispatch = useDispatch()
    function setNewRoom() {
        // const amountOfWords = prompt('amountOfWords: ', '40')
        const secondsForGame = prompt('secondsForGame: ', '30')
        const roomId = auth.currentUser.uid
        const text = generateRandomText(20)
        dispatch(setNewRoomData({
            roomId,
            text,
            secondsForGame:parseInt(secondsForGame),
            mainState:'ROOM'
        }))
        setUserInRoom(roomId,name)
    }
    return (
        <header className={s.header}>

         <div className={s.top}>
            <div className={s.flex}>

            <div className={s.left__bar}>
                <h1>typus</h1>

                <Keyboard/>
                <Settings/>
                <Information/>
                <Profile onClick={()=>{
                    // dispatch(setUser())
                    signOut(auth)
                }}/>

            </div>
            </div>
            <div className={s.right__bar}>
                {roomId!=='testRoom'
                    ? <><p ref={linkRef} onClick={copyHandler}>copy invite link</p><Copy/></>
                    : <button onClick={setNewRoom}>new room</button>}
            </div>

        </div>

            <div className={`${s.settings} ${auth.currentUser?.uid===roomId?s.isAuth:''}`}>
                <div>
                    <span className={language==='en'?s.selected:''} onClick={()=>dispatch(updateRoomData({language:'en'}))}>english</span>
                    <span className={language==='ru'?s.selected:''} onClick={()=>dispatch(updateRoomData({language:'ru'}))}>russian</span>
                </div>
                <div>
                    <span className={isEndTimeDependsOnTime===false?s.selected:''} onClick={()=>dispatch(updateRoomData({isEndTimeDependsOnTime:false}))}>words</span>
                    <span className={isEndTimeDependsOnTime===true?s.selected:''} onClick={()=>dispatch(updateRoomData({isEndTimeDependsOnTime:true}))}>timer</span>
                </div>
                <div>
                    <span className={secondsForGame===15?s.selected:''} onClick={()=>dispatch(updateRoomData({secondsForGame:15}))}>15</span>
                    <span className={secondsForGame===30?s.selected:''} onClick={()=>dispatch(updateRoomData({secondsForGame:30}))}>30</span>
                    <span className={secondsForGame===60?s.selected:''} onClick={()=>dispatch(updateRoomData({secondsForGame:60}))}>60</span>
                    <span className={secondsForGame===120?s.selected:''} onClick={()=>dispatch(updateRoomData({secondsForGame:120}))}>120</span>
                </div>
            </div>
        </header>
    );
};

export default Header;