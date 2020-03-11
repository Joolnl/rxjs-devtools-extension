import React, { useState, useEffect } from 'react';
import './devtoolsPane.css';
import Subscription from './subscription';
import { observable$ } from './content';
import * as uuid from 'uuid/v4';

export default function DevtoolsPane() {
    const createSubscription = (uuid, observable, type) => ({ uuid, observable, type });
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const subscription = observable$.subscribe(sub => {
            setSubscriptions(subs => [createSubscription(sub.uuid, sub.identifier, sub.type), ...subs])
        });

        // const resetSubscription;

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