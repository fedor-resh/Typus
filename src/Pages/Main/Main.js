import TextBox from '../../Components/TextBox/TextBox';
import Results from '../../Components/Results/Results';

import {useDispatch, useSelector} from 'react-redux';

import RestartButton from '../../UI/RestartButton/RestartButton';



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