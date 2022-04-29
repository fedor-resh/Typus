import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({children, onClose}) => {
  const handleClose = () => onClose();

  return ReactDOM.createPortal(
    <div className={styles.container} >
      <div className={styles.backdrop} onClick={handleClose} />
      <div className={styles.modal}>
        <div className={styles.window}>
          <div className={styles.close} onClick={handleClose}/>
          {children}
        </div>
      </div>
    </div>,
    window.document.body,
  );
};


export default Modal;
