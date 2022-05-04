import React, {useEffect} from 'react';
import {useRooms, useRoomsFromDatabase} from '../../Firebase/firebaseInit';
import s from './ListOfRooms.css';

const ListOfRooms = () => {
    const rooms = useRoomsFromDatabase()
    useEffect(()=>{
        console.log(rooms)
    })
    return (
            <div className={s.rooms}>
                {rooms&&rooms.map(el=>
                    <div key={el.roomSettings.title} className={s.point}>
                        <p onClick={()=>{}}>{el.roomSettings.title} room</p>
                    </div>
                )}
            </div>
    );
};

export default ListOfRooms;