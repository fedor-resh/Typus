import TextBox from '../../Components/TextBox/TextBox';
import Results from '../../Components/Results/Results';

import {useDispatch, useSelector} from 'react-redux';
import s from './Main.module.css'
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../../Components/SignIn/SignIn';
import {auth, database,  setUserInRoom} from '../../Firebase/firebaseInit';
import {useEffect} from 'react';
import { setRoomData} from '../../Redux/roomData';
import RestartButton from '../../Components/RestartButton/RestartButton';
import {setUser} from '../../Redux/user';


const Main = () => {
    const isResults = useSelector((state) => state.roomData.mainState) === 'RESULTS'
    const name = useSelector((state) => state.user.name)
    const [user] = useAuthState(auth)
    const dispatch = useDispatch()
    useEffect(() => {
        if(user){
            const setUse = async () => {
                let data
                await database.ref('users/' + user.uid + '/name').once('value',snapshot=>{
                    data = snapshot.val()
                })
                console.log('data: '+data)
                dispatch(setUser({name:data,id:user.uid}))
            }
            setUse()
        }

        const hash = window.location.hash.substring(1)
        if (hash&&user) {


            database.ref(hash + '/roomSettings').on('value', (snapshot) => {
                const data = snapshot.val();
                dispatch(setRoomData({roomId: hash, ...data}))
            });
        }
        if(name!=='user'){
            setUserInRoom(hash,name)
        }
    }, [user])
    return (
        <div className={s.wrapper}>

            {user
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