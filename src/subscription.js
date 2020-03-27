import React, { useState, useContext } from 'react';
import './subscription.css';
import MarbleDiagram from './marbleDiagram';
import { ObservableContext } from './contexts/observableContext';
import * as uuid from 'uuid/v4';

export default function Subscription(props) {
    const [open, setOpen] = useState(false);
    const { operators } = useContext(ObservableContext);

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
                {operators
                    .filter(operator => operator.observable === props.uuid)
                    .map(operator => {
                        return <div key={uuid()}>{operator.function}</div>
                    })}
                {/* <MarbleDiagram observable={props.uuid}></MarbleDiagram> */}
            </div>
        </div>
    );
}