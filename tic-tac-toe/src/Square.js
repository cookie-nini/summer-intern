import React from 'react';

function Square(props){
    return(
        <button style={{width:'40px',height:'40px'}} onClick={props.onClick}>{props.value}</button>
    );
}

export default Square