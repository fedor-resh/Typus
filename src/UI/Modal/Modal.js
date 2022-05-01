import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({children, onClose}) => {

  return ReactDOM.createPortal(
      <>
      <div className={styles.backdrop} onClick={onClose}/>
      <div className={styles.modal}>
        <div className={styles.window}>
          <div className={styles.close} onClick={onClose}/>
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
};


export default Modal;
