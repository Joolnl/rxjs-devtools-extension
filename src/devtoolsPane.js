import React, { useState, useLayoutEffect } from 'react';
import './devtoolsPane.css';
import Subscription from './subscription';
import { getSubscription$ } from './content';
import * as uuid from 'uuid/v4';
import { map } from 'rxjs/operators';

export default function DevtoolsPane() {
    const createSubscription = (uuid, observable, type, child$) => ({ uuid, observable, type, child$ });
    const [subscriptions, setSubscriptions] = useState([]);

    useLayoutEffect(() => {
        const fetchSubscription = async () => {
            const subscription = await getSubscription$();
            
            subscription.subscribe(message => {
                const { metadata, child$ } = message;
                setSubscriptions(subscriptions => [createSubscription(metadata.uuid, metadata.identifier, metadata.type, child$), ...subscriptions]);
            });

            return () => subscription.unsubscribe();
        }

        fetchSubscription();
    }, []);

    return (
        <div className='DevtoolsPane'>
            {subscriptions
                .map(sub => {
                    return <Subscription key={uuid()} uuid={sub.uuid} observable={sub.observable} type={sub.type} child$={sub.child$}></Subscription>
                })}
        </div>
    );
}