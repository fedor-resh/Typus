import React from 'react';
import Modal from '../../UI/Modal/Modal';
import s from './ThemesList.module.css'
import {setTheme} from '../../Redux/user';
import {useDispatch} from 'react-redux';

const ThemesList = ({onClose}) => {
    const themes = [
        'Matrix',
        'Ocean',
        'Pink',
    ]
    const dispatch = useDispatch()
    return (
            <Modal onClose={onClose}>
                <div className={s.themes}>
                    {themes.map(el=>
                        <div className={s.point}>
                            <p onClick={()=>{dispatch(setTheme(el))}}>{el}</p>
                        </div>
                    )}
                </div>

            </Modal>

    );
};

export default ThemesList;