import React, { useState, useContext } from 'react';
import './observable.css';
import { ObservableContext } from './contexts/observableContext';
import * as uuid from 'uuid/v4';
import Subscription from './subscription';

export default function Observable(props) {
    const [open, setOpen] = useState(false);
    const { subscribers } = useContext(ObservableContext);

    const openObservable = () => {
        setOpen(!open);
    };

    const subscriptions = () => {
        return subscribers.filter(sub => sub.observable === props.observable);
    };

    return (
        <div className='Observable'>
            <div
                className={`header${open ? ' open' : ''}${!subscriptions().length ? ' unsubscribed' : ''}`}
                onClick={openObservable}>
                <span className='fat'>{props.observable}</span>
                <span className='fat'>{props.type}</span>
                <span>{props.uuid}</span>
            </div>

            <div className={`marble-diagram${open ? ' open' : ''}`}>
                {subscriptions()
                    .map(sub => {
                        return <Subscription key={uuid()} uuid={sub.uuid} pipes={sub.pipes} line={sub.line} file={sub.file} />
                    })
                }
            </div>
        </div>
    );
}