import React from 'react';
import './operator.css';

export default function Operator(props) {
    return (
        <div className='Operator'>
            <span>
                {props.fn}
            </span>
        </div>
    );
}