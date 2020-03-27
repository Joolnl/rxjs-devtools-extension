import React, { useContext, useEffect } from 'react';
import './devtoolsPane.css';
import Subscription from './subscription';
import { getMessage$ } from './content';
import * as uuid from 'uuid/v4';
import { DispatchContext, ObservableContext } from './contexts/observableContext';

export default function DevtoolsPane() {
    const dispatch = useContext(DispatchContext);
    const { observables } = useContext(ObservableContext);

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
            test
            {observables
                .map(observable => {
                    return <Subscription key={uuid()} uuid={observable.uuid} type={observable.type}></Subscription>
                })}
        </div>
    );
}