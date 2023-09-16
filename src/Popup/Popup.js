import React, {useEffect, useRef} from 'react';
import styles from './Popup.module.css';

const Popup = ({ onSubmit }) => {
    const ref = useRef(null);
    // button on enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSubmit(ref.current.value);
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        ref.current.focus()
    },[])
    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <input className={styles.input} ref={ref} type="text" placeholder="username" />
                <button className={styles.button} onClick={()=>onSubmit(ref.current.value)}>Submit</button>
            </div>
        </div>
    );
};

export default Popup;
