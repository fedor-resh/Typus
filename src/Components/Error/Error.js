import React from 'react';

const Error = ({error}) => {
    return (
        <div style={{display:'grid',placeItems:'center',height:`30vh`}}>
           <h1 style={{color:'#a71010'}}>Error {error}</h1>
        </div>
    );
};

export default Error;