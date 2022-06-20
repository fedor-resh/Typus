import React, {Fragment, useEffect, useState} from 'react';
import s from './Results.module.css'

import {database, useResultsFromDatabase} from '../../Firebase/firebaseInit';
import {connect, useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import RestartButton from "../../UI/RestartButton/RestartButton";


const Results = () => {
    const roomId = useSelector(state => state.roomData.value.roomId)
    const isResults = useSelector((state) => state.roomData.value.mainState) === 'RESULTS'

    const results = useResultsFromDatabase(roomId)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isResults) {
            navigate('/')
        }
    }, [isResults, results])


    return (
        <>
            <div className={s.grid}>
                <div/>
                <p className={s.executiveSystem}>char/min</p>
                <p className={s.executiveSystem}>right</p>
                <p className={s.executiveSystem}>points</p>
                {results && results
                    .sort((f, s) => s.ball - f.ball)
                    .map(({name, charPerMinute, PercentageOfRight, ball}, id) =>
                        <Fragment key={id}>
                            <p className={s.name} style={id === 0 ? {color: '#b8a439'} : (id === 1 ? {color: '#a1a1a1'} : (id === 2 ? {color: '#8b694b'} : {}))}>{name}</p>
                            <p className={s.number} style={id === 0 ? {color: '#b8a439'} : (id === 1 ? {color: '#a1a1a1'} : (id === 2 ? {color: '#8b694b'} : {}))}>{charPerMinute}</p>
                            <p className={s.number} style={id === 0 ? {color: '#b8a439'} : (id === 1 ? {color: '#a1a1a1'} : (id === 2 ? {color: '#8b694b'} : {}))}>{PercentageOfRight + '%'}</p>
                            <p className={s.number} style={id === 0 ? {color: '#b8a439'} : (id === 1 ? {color: '#a1a1a1'} : (id === 2 ? {color: '#8b694b'} : {}))}>{ball}</p>
                        </Fragment>
                    )}
            </div>
            <RestartButton/>
        </>
    );
};

export default Results;
