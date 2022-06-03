import React, {useEffect} from 'react';

const Error = ({massage, subtitle}) => {
    return (
        <div style={{display: 'grid', placeItems: 'center', marginTop: `20vh`}}>
            <h1 style={{color: '#a71010'}}>{massage}</h1>
            <p style={{color: 'rgba(167,16,16,0.73)'}}>{subtitle}</p>
        </div>
    );
};

export default Error;
