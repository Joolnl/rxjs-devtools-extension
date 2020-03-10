import React from 'react';
import './marble.css';

export default function Marble(props) {
    const colorClass = () => `color${props.color + 1}`;
    const empty = () => props.value ? '' : 'empty';

    return (
        <div className={`Marble ${colorClass()} ${empty()}`}>
            <span>
                {props.value}
            </span>
        </div>
    );
}