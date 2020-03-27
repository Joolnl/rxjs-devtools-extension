import React, { useState, useLayoutEffect, useContext, useEffect } from 'react';
import './devtoolsPane.css';
import Subscription from './subscription';
import { observable$, reset$, getMessage$ } from './content';
import * as uuid from 'uuid/v4';
import { take } from 'rxjs/operators';
import { DispatchContext, ObservableContext } from './contexts/observableContext';

export default function DevtoolsPane() {
    const dispatch = useContext(DispatchContext);
    const observables = useContext(ObservableContext);

    console.log(observables);

    useEffect(() => {
        (async () => {
            const message$ = await getMessage$();
            const subscription = message$.subscribe(msg => {
                dispatch({ type: msg.type, payload: msg.message });
            });

            return () => subscription.unsubscribe();
        })();
    }, []);

    // const createSubscription = (uuid, observable, type) => ({ uuid, observable, type });
    // const [subscriptions, setSubscriptions] = useState([]);

    // useLayoutEffect(() => {
    //     const subscription = observable$.subscribe(sub => {
    //         setSubscriptions(subs => [createSubscription(sub.uuid, sub.identifier, sub.type), ...subs])
    //     });

    //     reset$.subscribe(() => {
    //         setSubscriptions([]);
    //     });

    //     return () => subscription.unsubscribe();
    // }, []);

    return (
        <div className='DevtoolsPane' onClick={() => dispatch({ type: 'test', payload: 1 })}>
            test
            {observables.observables
                .map(sub => {
                    return <Subscription key={uuid()} uuid={sub.uuid} observable={sub.observable} type={sub.type} child$={sub.child$}></Subscription>
                })}
        </div>
    );
}