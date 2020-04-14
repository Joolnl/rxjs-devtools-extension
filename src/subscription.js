import React, { useContext, useState, memo } from 'react';
import { ObservableContext } from './contexts/observableContext';
import * as uuid from 'uuid/v4';
import Pipe from './pipe';
import './subscription.css';
import { EventContext } from './contexts/eventContext';
import MarbleLane from './marbleLane';

const WrappedSubscription = memo(function Subscription(props) {
    const [open, setOpen] = useState(false);
    const { pipes } = useContext(ObservableContext);
    const { subscribeEvents } = useContext(EventContext);

    const openSubscription = () => {
        // props.setOpen();
        setOpen(!open);
    };

    const eventsForSubscription = subscription => {
        return subscribeEvents
            .filter(event => event.receiver === subscription)
            .map(event => event.data)
            .map(event => JSON.stringify(event));
    };

    return (
        <div className='Subscription'>
            <div className={`header${open ? ' open' : ''}`} onClick={openSubscription}>
                <span>line</span>
                <span className='fat'>{props.line}</span>
                <span>file</span>
                <span className='fat' >{props.file}</span>
            </div>
            <div className={`content${open ? ' open' : ''}`}>
                {pipes
                    .filter(pipe => props.pipes && props.pipes.includes(pipe.uuid))
                    .map(pipe => {
                        return <Pipe key={uuid()} pipe={pipe.uuid} />
                    })
                }
                <MarbleLane marbles={eventsForSubscription(props.uuid)} />
            </div>
        </div>
    );
});

export default WrappedSubscription;