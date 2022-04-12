import React, {useState} from 'react';
import s from './Header.module.css'
import {ReactComponent as Keyboard} from '../../svg/keyboard.svg'
import {ReactComponent as Chat} from '../../svg/chat.svg'
import {ReactComponent as Profile} from '../../svg/profil.svg'
import {ReactComponent as Information} from '../../svg/information.svg'
import {ReactComponent as Settings} from '../../svg/settings.svg'
import {ReactComponent as Copy} from '../../svg/copy-link 1.svg'

const Header = () => {
    const [isInRoom, setIsInRoom] = useState(false)
    return (
        <header className={s.header}>
            <div className={s.left__bar}>
                <h1>rushtype</h1>
                <div className={s.flex}>
                    <Keyboard/>
                    <Settings/>
                    <Information/>
                    <Profile/>
                </div>
            </div>
            <div className={s.right__bar}>
                {isInRoom
                    ? <><p>copy invite link</p><Copy/></>
                    : <button onClick={() => {
                        setIsInRoom(true)
                    }}>new room</button>}
            </div>
        </header>

    );
};

export default Header;