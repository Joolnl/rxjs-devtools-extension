import React, { useContext, useEffect } from 'react';
import './devtoolsPane.css';
import Observable from './observable';
import { getMessage$ } from './content';
import * as uuid from 'uuid/v4';
import { DispatchContext as ObservableDispatch, ObservableContext } from './contexts/observableContext';
import { DispatchContext as EventDispatch } from './contexts/eventContext';

export default function DevtoolsPane() {
    const observableDispatch = useContext(ObservableDispatch);
    const eventDispatch = useContext(EventDispatch);
    const { observables } = useContext(ObservableContext);

    const nonJoinObservables = () => {
        return observables.filter(observable => !observable.join);
    };

    // Receive messages from content script and feed to observable dispatcher.
    useEffect(() => {
        (async () => {
            const message$ = await getMessage$();
            const subscription = message$.subscribe(msg => {
                if (msg.type === 'event') {
                    const { message } = msg;
                    eventDispatch({ type: message.type, payload: msg.message });
                } else {
                    observableDispatch({ type: msg.type, payload: msg.message });
                }
            });

            return () => subscription.unsubscribe();
        })();
    }, [observableDispatch, eventDispatch]);

    return (
        <div className='DevtoolsPane'>
            {nonJoinObservables()
                .map(observable => {
                    return <Observable
                        key={uuid()}
                        observable={observable.uuid}
                        type={observable.type}
                        baseObservables={observable.observables} />
                })}
        </div>
    );
}