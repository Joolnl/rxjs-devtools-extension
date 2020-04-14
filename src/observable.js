import React, { useState, useContext, memo } from 'react';
import './observable.css';
import { ObservableContext } from './contexts/observableContext';
import * as uuid from 'uuid/v4';
import WrappedSubscription from './subscription';
import BaseObservable from './baseObservable';
import ObservableHeader from './observableHeader';

const WrappedObservable = memo(function Observable(props) {
    const [open, setOpen] = useState(false);
    const { subscribers, observables } = useContext(ObservableContext);

    const openObservable = () => {
        setOpen(!open);
    };

    const subscriptions = () => {
        return subscribers.filter(sub => sub.observable === props.observable || sub.observable === props.parent);
    };

    const subscriptionAmount = () => subscriptions().length;

    const baseObservables = () => {
        if (props.baseObservables) {
            return observables
                .filter(observable => props.baseObservables.map(observable => observable.uuid).includes(observable.uuid));
        }
        return [];
    };

    return (
        <div className='Observable'>
            <ObservableHeader
                click={openObservable}
                observable={props.observable}
                subscriptions={subscriptionAmount()}
                identifier={props.identifier}
                type={props.type}
            />

            <div className={`marble-diagram${open ? ' open' : ''}`}>
                {baseObservables()
                    .map(observable => {
                        return <BaseObservable key={uuid()} uuid={observable.uuid} identifier={observable.identifier} type={observable.type} />
                    })}

                {!props.parent && subscriptions()
                    .map(sub => {
                        return <WrappedSubscription
                            key={uuid()}
                            uuid={sub.uuid}
                            pipes={sub.pipes}
                            line={sub.line}
                            file={sub.file} />
                    })
                }

            </div>
        </div>
    );
});

export default WrappedObservable;