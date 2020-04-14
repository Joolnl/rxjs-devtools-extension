import React, { useContext } from 'react';
import { EventContext } from './contexts/eventContext';
import './observableHeader.css';

export default function ObservableHeader(props) {
    const { initialEvents } = useContext(EventContext);

    const eventAmount = () => {
        return initialEvents.filter(event => event.observable === props.observable).length;
    };

    return (
        <div className='ObservableHeader' onClick={props.click}>
            <span>{props.identifier}</span>
            <span>{props.type}</span>
            <span>{`${eventAmount()} events`}</span>
            <span>{`${props.subscriptions} subscribers`}</span>
        </div>
    );
}