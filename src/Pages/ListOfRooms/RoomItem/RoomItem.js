import React, {useEffect} from 'react';
import s from './RoomItem.module.css'
import {ReactComponent as Locked} from '../../../svg/locked.svg';
import {ReactComponent as User} from '../../../svg/profil.svg';

const RoomItem = ({title,hasPassword,amountOfUsers,language,connectRoomHandler}) => {

    return (
            <div
                onClick={connectRoomHandler}
                key={title}
                className={s.item}
            >
                <p className={s.title}>{title}</p>

                <div className={s.right__wrapper}>
                    {hasPassword?<Locked className={s.lock}/>:null}
                    <User className={s.user}/>
                    <p style={{marginBottom:3}}>{amountOfUsers}</p>
                    <p style={{marginBottom:3}}>{language}</p>
                </div>
            </div>
        )
};

export default RoomItem;