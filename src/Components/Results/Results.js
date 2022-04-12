import React from 'react';
import s from './Results.module.css'
import {useSelector} from 'react-redux';


const Results = () => {
    const {amountOfCharacters} = useSelector(state => state.result)
    return (
        <div>
            <h1>{amountOfCharacters}</h1>
        </div>
    );
};

export default Results;