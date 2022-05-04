import TextBox from '../../Components/TextBox/TextBox';
import Results from '../../Components/Results/Results';

import {useDispatch, useSelector} from 'react-redux';
import s from './Main.module.css'
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../../Components/SignIn/SignIn';
import {auth, database,  setUserInRoom} from '../../Firebase/firebaseInit';
import {useEffect} from 'react';
import { setRoomData} from '../../Redux/roomData';
import RestartButton from '../../UI/RestartButton/RestartButton';
import {setUser} from '../../Redux/user';
import {setThemeClass} from '../../utils';


const Main = () => {
    const isResults = useSelector((state) => state.roomData.mainState) === 'RESULTS'
    const {name,id} = useSelector((state) => state.user)
    const [user] = useAuthState(auth)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(window.innerWidth < 850){
            alert('this app dont work right on this width of screen')
        }
        setThemeClass('Ocean')
    },[])

    return (
        <div className={s.wrapper}>

            {id!=='testId'
                ? (
                    <>
                    {(isResults
                        ? <Results/>
                        : <TextBox/>)}
                        <RestartButton/>
                    </>
                )
                : <SignIn/>
            }
        </div>
    );
};

export default Main;