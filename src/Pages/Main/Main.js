import TextBox from '../../Components/TextBox/TextBox';
import Results from '../../Components/Results/Results';

import {useDispatch, useSelector} from 'react-redux';
import s from './Main.module.css'
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../../Components/SignIn/SignIn';
import {auth, database, setUserInRoom} from '../../Firebase/firebaseInit';
import {useEffect} from 'react';
import {setRoomData} from '../../Redux/roomData';
import RestartButton from '../../UI/RestartButton/RestartButton';
import {setUser} from '../../Redux/user';
import {setThemeClass} from '../../utils/utils';


const Main = () => {
    const isResults = useSelector((state) => state.roomData.value.mainState) === 'RESULTS'



    return (
        <>
            {isResults ? <Results/> : <TextBox/>}
            <RestartButton/>
        </>
    );
};

export default Main;