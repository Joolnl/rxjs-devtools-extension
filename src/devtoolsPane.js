import React, { useState, useLayoutEffect } from 'react';
import './devtoolsPane.css';
import Subscription from './subscription';
import { observable$, reset$ } from './content';
import * as uuid from 'uuid/v4';
import { take } from 'rxjs/operators';

export default function DevtoolsPane() {
    const createSubscription = (uuid, observable, type) => ({ uuid, observable, type });
    const [subscriptions, setSubscriptions] = useState([]);

    useLayoutEffect(() => {
        const subscription = observable$.subscribe(sub => {
            setSubscriptions(subs => [createSubscription(sub.uuid, sub.identifier, sub.type), ...subs])
        });

        reset$.pipe(
            take(1)
        ).subscribe(() => {
            setSubscriptions([]);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className='DevtoolsPane'>
            {subscriptions
                .map(sub => {
                    return <Subscription key={uuid()} uuid={sub.uuid} observable={sub.observable} type={sub.type}></Subscription>
                })}
        </div>
    );
}