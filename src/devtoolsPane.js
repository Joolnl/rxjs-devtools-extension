import React, { useContext, useEffect } from 'react';
import './devtoolsPane.css';
import Observable from './observable';
import { getMessage$ } from './content';
import * as uuid from 'uuid/v4';
import { DispatchContext, ObservableContext } from './contexts/observableContext';

export default function DevtoolsPane() {
    const dispatch = useContext(DispatchContext);
    const { observables } = useContext(ObservableContext);

    // Receive messages from content script and feed to observable dispatcher.
    useEffect(() => {
        (async () => {
            const message$ = await getMessage$();
            const subscription = message$.subscribe(msg => {
                dispatch({ type: msg.type, payload: msg.message });
            });

            return () => subscription.unsubscribe();
        })();
    }, [dispatch]);

    return (
        <div className='DevtoolsPane'>
            {observables
                .map(observable => {
                    return <Observable key={uuid()} observable={observable.uuid} type={observable.type}></Observable>
                })}
        </div>
    );
}