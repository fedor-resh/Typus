import React, {Fragment, useMemo} from 'react';
import s from './TextBox.module.css';
import {calculateCurrentColumnAndRow} from './textBoxUtils';

const Cursor = ({name, index, lengthOfLines}) => {
    const [curPosition, curLine] = calculateCurrentColumnAndRow(index, lengthOfLines)
    return (
        <Fragment key={name}>
            <div style={{
                left: `${(curPosition) * 14.9 - 1}px`,
                top: `${(curLine) * 38 + 4}px`
            }} className={s.user__cursor}>
            </div>
            <p
                style={{
                    left: `${(curPosition) * 14.9 + 5}px`,
                    top: `${(curLine) * 38 - 10}px`
                }}
            >{name}</p>
        </Fragment>
    );
};

export default Cursor;