import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({children, onClose}) => {
  const handleClose = () => onClose();

  return ReactDOM.createPortal(
    <div className={styles.container} onClick={handleClose}>
      <div className={styles.backdrop}/>
      <div className={styles.modal}>
        <div className={styles.window}>
          {/*<div className={styles.close} onClick={handleClose}/>*/}
          {children}
        </div>
      </div>
    </div>,
    window.document.body,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
