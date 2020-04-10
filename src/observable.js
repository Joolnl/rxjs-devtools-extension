import React, { useState, useContext } from 'react';
import './observable.css';
import { ObservableContext } from './contexts/observableContext';
import * as uuid from 'uuid/v4';
import Subscription from './subscription';
import BaseObservable from './baseObservable';
import { EventContext } from './contexts/eventContext';

export default function Observable(props) {
    const [open, setOpen] = useState(false);
    const { subscribers, observables } = useContext(ObservableContext);
    const { initialEvents } = useContext(EventContext);

    const openObservable = () => {
        setOpen(!open);
    };

    const subscriptions = () => {
        return subscribers.filter(sub => sub.observable === props.observable || sub.observable === props.parent);
    };

    const subscriptionAmount = () => subscriptions().length;

    const eventAmount = () => {
        return initialEvents.filter(event => event.observable === props.observable).length;
    }

    const baseObservables = () => {
        if (props.baseObservables) {
            return observables
                .filter(observable => props.baseObservables.map(observable => observable.uuid).includes(observable.uuid));
        }
        return [];
    };

    return (
        <div className='Observable'>
            <div
                className={`header${open ? ' open' : ''}${!subscriptions().length ? ' unsubscribed' : ''}`}
                onClick={openObservable}>
                <span className='fat'>{props.identifier}</span>
                <span className='fat'>{props.type}</span>
                <span className='meta'>{`${subscriptionAmount()} subscribers`}</span>
                <span className='meta'>{`${eventAmount()} events`}</span>
            </div>

            <div className={`marble-diagram${open ? ' open' : ''}`}>
                {baseObservables()
                    .map(observable => {
                        return <BaseObservable key={uuid()} uuid={observable.uuid} identifier={observable.identifier} type={observable.type} />
                    })}

                {!props.parent && subscriptions()
                    .map(sub => {
                        return <Subscription key={uuid()} uuid={sub.uuid} pipes={sub.pipes} line={sub.line} file={sub.file} />
                    })
                }

            </div>
        </div>
    );
}