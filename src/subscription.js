import React, { useContext, useState } from 'react';
import { ObservableContext } from './contexts/observableContext';
import * as uuid from 'uuid/v4';
import Pipe from './pipe';
import './subscription.css';

export default function Subscription(props) {
    const [open, setOpen] = useState(false);
    const { pipes } = useContext(ObservableContext);

    const openSubscription = () => {
        setOpen(!open);
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
                    .filter(pipe => props.pipes.includes(pipe.uuid))
                    .map(pipe => {
                        return <Pipe key={uuid()} pipe={pipe.uuid} />
                    })
                }
            </div>
        </div>
    );
};