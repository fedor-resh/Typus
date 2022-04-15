
import TextBox from '../../Components/TextBox/TextBox';
import Results from '../../Components/Results/Results';

import { useSelector} from 'react-redux';
import s from './Main.module.css'
import {useAuthState} from 'react-firebase-hooks/auth';
import SignIn from '../../Components/SignIn/SignIn';
import {auth} from '../../Firebase/firebaseInit';


const Main = () => {
    const typingEnd = useSelector((state)=>state.isTypingEnd.value)
    const [user] = useAuthState(auth)

    return (
        <div className={s.wrapper}>

            {user
                ?(typingEnd
                ?<Results/>
                :<TextBox/>)
                :<SignIn/>}
        </div>
    );
};

export default Main;