import React, { useState } from 'react';
import './subscription.css';
import MarbleDiagram from './marbleDiagram';

export default function Subscription(props) {
    const [open, setOpen] = useState(false);

    const openSubscription = () => {
        setOpen(!open);
    };

    return (
        <div className='Subscription'>
            <div className={`header${open ? ' open' : ''}`} onClick={openSubscription}>
                <span className='fat'>{props.observable}</span>
                <span className='fat'>{props.type}</span>
                <span>{props.uuid}</span>
            </div>

            <div className={`marble-diagram${open ? ' open' : ''}`}>
                <MarbleDiagram observable={props.uuid}></MarbleDiagram>
            </div>
        </div>
    );
}