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
    // console.log(results.reduce((max,el)=>el.ball>max.ball?el:max),0)
    // const winner = results.indexOf(results.reduce((max,el)=>el.ball>max.ball?el:max),0)
    // console.log(winner)
    const styles = (id) => id===0?{color:'gold'}:(id===1?{color:'silver'}:(id===2?{color:'#a87030'}:{}))

    return (
        <div>
            <div className={s.grid}>
                <div/>
                <p className={s.executiveSystem}>cpm</p>
                <p className={s.executiveSystem}>acc</p>
                <p className={s.executiveSystem}>ball</p>
                {results&&results
                    .sort((f,s)=>s.ball - f.ball)
                    .map(({name,charPerMinute,PercentageOfRight,ball},id)=>
                    <Fragment key={id}>
                        <p className={s.name} style={id===0?{color:'#b8a439'}:(id===1?{color:'#a1a1a1'}:(id===2?{color:'#8b694b'}:{}))}>{name}</p>
                        <p className={s.number} style={id===0?{color:'#b8a439'}:(id===1?{color:'#a1a1a1'}:(id===2?{color:'#8b694b'}:{}))}>{charPerMinute}</p>
                        <p className={s.number} style={id===0?{color:'#b8a439'}:(id===1?{color:'#a1a1a1'}:(id===2?{color:'#8b694b'}:{}))}>{PercentageOfRight + '%'}</p>
                        <p className={s.number} style={id===0?{color:'#b8a439'}:(id===1?{color:'#a1a1a1'}:(id===2?{color:'#8b694b'}:{}))}>{ball}</p>
                    </Fragment>

                )}
            </div>
        </div>
    );
};

export default Results;