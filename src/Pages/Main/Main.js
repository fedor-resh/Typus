import TextBox from '../../Components/TextBox/TextBox';
import Results from '../../Components/Results/Results';

import {useDispatch, useSelector} from 'react-redux';
import s from './Main.module.css'
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../../Components/SignIn/SignIn';
import {auth, database} from '../../Firebase/firebaseInit';
import {useEffect} from 'react';
import {FetchRoomData, setRoomData} from '../../Redux/roomData';


const Main = () => {
    const isResults = useSelector((state) => state.roomData.mainState) === 'RESULTS'
    const [user] = useAuthState(auth)
    const dispatch = useDispatch()
    useEffect(()=>{
        const hash = window.location.hash.substring(1)
        if(hash){
            database.ref(hash+'/roomSettings').on('value', (snapshot) => {
                const data = snapshot.val();
                dispatch(setRoomData({roomId:hash,...data}))
            });
        }
    },[])
    return (
        <div className={s.wrapper}>

            {user
                ? (isResults
                    ? <Results/>
                    : <TextBox/>)
                : <SignIn/>}
        </div>
    );
};

export default Main;