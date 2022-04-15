import React, {Fragment, useEffect} from 'react';
import s from './Results.module.css'

import { useResultsFromDatabase} from '../../Firebase/firebaseInit';
import {useSelector} from 'react-redux';


const Results = () => {
    const roomId = useSelector(state => state.roomData.roomId)
    const results = useResultsFromDatabase(roomId)
    useEffect(()=>{
        console.log(results)
    })
    return (
        <div>
            <div className={s.grid}>
                <div/>
                <p className={s.executiveSystem}>cpm</p>
                <p className={s.executiveSystem}>acc</p>
                <p className={s.executiveSystem}>ball</p>
                {results&&results.map(({name,charPerMinute,PercentageOfRight,ball},id)=>
                    <Fragment key={id}>
                        <p className={s.name}>{name}</p>
                        <p className={s.number}>{charPerMinute}</p>
                        <p className={s.number}>{PercentageOfRight + '%'}</p>
                        <p className={s.number}>{ball}</p>
                    </Fragment>

                )}
            </div>
        </div>
    );
};

export default Results;