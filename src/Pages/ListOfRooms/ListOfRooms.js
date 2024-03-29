import React, {useEffect} from 'react';
import {useRoomsFromDatabase} from '../../Firebase/firebaseInit';
import s from './ListOfRooms.module.css';
import {connectToRoom} from '../../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import RoomItem from './RoomItem/RoomItem';
import {useUserSelector} from "../../Redux/reduxHooks";



const ListOfRooms = () => {
    const rooms = useRoomsFromDatabase()
    const user = useUserSelector()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function connectRoomHandler(title,password) {
        if(password){
            const writtenPassword = prompt('enter password: ')
            if(password!==writtenPassword)return
        }
        try{connectToRoom(title, user, dispatch)} catch (e) {}
        navigate('/', {replace: true})
    }
    function getProps(room){
        const {language, title, password, roomId} = room.roomSettings
        const amountOfUsers = room.users ? Object.keys(room.users).length : 0
        return  {
            key:title,
            language,
            title,
            amountOfUsers,
            hasPassword: !!password,
            connectRoomHandler: () => connectRoomHandler(roomId, password),
        }
    }
    if(!rooms.length){
        return (<center><p className={s.empty}>empty</p></center>)
    }else {
        return (
            <>
                <p className={s.rooms__online}>
                    online rooms: {Object.keys(rooms).length}
                </p>
                {rooms.map(room => {
                    const props = getProps(room)
                    return <RoomItem {...props}/>
                })}
            </>
        );
    }
};

export default ListOfRooms;