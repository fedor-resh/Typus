import React, {Fragment, useEffect} from 'react';
import s from './Results.module.css'
import {useSelector} from 'react-redux';


const Results = () => {
    const {amountOfCharacters,seconds,amountOfMistakes} = useSelector(state => state.result)
    console.log({amountOfCharacters,seconds,amountOfMistakes})
    const data = [
        {
            name:'fedor',
            charPerMinute:amountOfCharacters/seconds*60,
            PercentageOfRight:Math.round((1 - amountOfMistakes/amountOfCharacters) * 100),
            ball:(amountOfCharacters/seconds*60)*(1 - amountOfMistakes/amountOfCharacters),
        },
        {
            name:'petr',
            charPerMinute:43,
            PercentageOfRight:80,
            ball:33,
        },
        {
            name:'denis',
            charPerMinute:43,
            PercentageOfRight:80,
            ball:33,
        }
    ]
    return (
        <div>
            <div className={s.grid}>
                <div/>
                <p className={s.executiveSystem}>cpm</p>
                <p className={s.executiveSystem}>acc</p>
                <p className={s.executiveSystem}>ball</p>
                {data.map(({name,charPerMinute,PercentageOfRight,ball})=>
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