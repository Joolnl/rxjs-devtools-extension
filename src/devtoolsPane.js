import React, { useState, useLayoutEffect } from 'react';
import './devtoolsPane.css';
import Subscription from './subscription';
import { getSubscription$ } from './content';
import * as uuid from 'uuid/v4';
import { map } from 'rxjs/operators';

export default function DevtoolsPane() {
    const createSubscription = (uuid, observable, type) => ({ uuid, observable, type });
    const [subscriptions, setSubscriptions] = useState([]);

    useLayoutEffect(() => {
        let subscription;
        getSubscription$().then(sub$ => {
            subscription = sub$
                .pipe(map(val => val[0]))
                .subscribe(sub => {
                    console.log(sub);
                    setSubscriptions(subs => [createSubscription(sub.uuid, sub.identifier, sub.type), ...subs]);
                });
        });

        // const subscription = subscription$.subscribe(sub => {
        //     setSubscriptions(subs => [createSubscription(sub.uuid, sub.identifier, sub.type), ...subs])
        // });

        // reset$.subscribe(() => {
        //     setSubscriptions([]);
        // });

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