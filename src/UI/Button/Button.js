import React, {FC} from 'react';
import s from './Button.module.css';


export const Button = ({
                           fontSize,
                           backgroundColor,
                           size = 'medium',
                           type = 'primary',
                           children,
                           ...props
                       }) => {
    const sizes = {
        small: 16,
        medium: 24,
        big: 32,
    }
    return (
        <button
            type="button"
            className={`${s.base} ${s[type]}`}
            style={{fontSize: sizes[size], backgroundColor}}
            {...props}
        >
            {children}
        </button>
    );
};



