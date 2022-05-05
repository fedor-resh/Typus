import React, {useEffect} from 'react';
import {useRooms, useRoomsFromDatabase} from '../../Firebase/firebaseInit';
import s from './ListOfRooms.module.css';
import {roomConnect} from '../../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const ListOfRooms = () => {
    const rooms = useRoomsFromDatabase()
    const name = useSelector(state => state.user.name)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function connectRoomHandler(title) {
        roomConnect(title, name , dispatch)
        navigate('/', {replace: true})
    }
    useEffect(()=>{
        console.log(rooms)
    })
    return (
        <div className={s.rooms}>
            {!rooms.length
                ?<center><h1 className={s.empty}>empty</h1></center>
                :rooms.map(el => {
                const title = el.roomSettings.title
                    return (
                        <div key={title} className={s.point}>
                        <p onClick={() => connectRoomHandler(title)}
                        >{title}</p>
                    </div>
                    )
                }
            )}
        </div>
    );
};

export default ListOfRooms;