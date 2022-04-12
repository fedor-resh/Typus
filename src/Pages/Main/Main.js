import React from 'react';
import TextBox from '../../Components/TextBox/TextBox';
import Results from '../../Components/Results/Results';
import { useSelector} from 'react-redux';

const Main = () => {
    const typingEnd = useSelector((state)=>state.isTypingEnd.value)
    return (
        <div style={{minHeight:'1vh'}}>
            {typingEnd
                ?<Results/>
                :<TextBox/>}
        </div>
    );
};

export default Main;