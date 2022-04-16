import React, {Fragment, useEffect, useState} from 'react';
import s from './Results.module.css'

import {database, useResultsFromDatabase} from '../../Firebase/firebaseInit';
import {useSelector} from 'react-redux';


const Results = () => {
    const roomId = useSelector(state => state.roomData.roomId)
    const results = useResultsFromDatabase(roomId)
    useEffect(()=>{
        console.log(results)
    },[results])

    // const [results, setResults] = useState([])
    //
    // useEffect(() => {
    //     const res = []
    //
    //     const ref = database.ref(roomId + '/results');
    //     ref.on('value', (snapshot) => {
    //         const obj = snapshot.val()
    //         res.push(obj)
    //         setResults(res)
    //     });
    //     console.log(results)
    //
    //     // ref.set({})
    // },[])

    return (
        <div>
            <div className={s.grid}>
                <div/>
                <p className={s.executiveSystem}>cpm</p>
                <p className={s.executiveSystem}>acc</p>
                <p className={s.executiveSystem}>ball</p>
                {results&&results.map(({name,charPerMinute,PercentageOfRight,ball})=>
                    <Fragment key={name}>
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