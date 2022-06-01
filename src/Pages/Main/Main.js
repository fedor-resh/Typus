import TextBox from '../../Components/TextBox/TextBox';
import Results from '../../Components/Results/Results';

import {useDispatch, useSelector} from 'react-redux';

import RestartButton from '../../UI/RestartButton/RestartButton';
import {useEffect, useState} from "react";



const Main = () => {
    const [state,setState] = useState(false)
    const isResults = useSelector((state) => state.roomData.value.mainState) === 'RESULTS'
    useEffect(()=>{
        setTimeout(()=>{
            setState(isResults)
        },100)
    },[isResults])
    return (
        <>
            {state ? <Results/> : <TextBox/>}
            <RestartButton/>
        </>
    );
};

export default Main;