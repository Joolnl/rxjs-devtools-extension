import React, { useEffect, useState } from 'react';
import MarbleOperatorSet from './marbleOperatorSet';
import { backpageMessageSubject$ } from './content';
import { map, filter, tap } from 'rxjs/operators';
import './marbleDiagram.css';
import * as uuid from 'uuid/v4';

declare var chrome;
const print = msg => chrome.extension.getBackgroundPage().console.log(msg);

class EventMap {
    eventArrays;

    constructor(eventArrays = new Map()) {
        this.eventArrays = eventArrays;
    }

    // Adds marble to map under given id, returns marblelanes.
    addEvent = (id, data) => {
        const eventArrays = new Map(this.eventArrays);
        const current = eventArrays.get(id);
        if (!current) {
            eventArrays.set(id, [data]);
        } else {
            eventArrays.set(id, [...current, data]);
        }
        return new EventMap(eventArrays);
    }

    getNthEvent = (n) => {
        const result = [];
        for (let key of this.eventArrays.keys()) {
            result.push(this.eventArrays.get(key)[n]);
        }
        return result;
    }
}

export default function MarbleDiagramDeprecated(props) {
    const zip = (a1, m2) => a1.map((x, i) => [x, m2.getNthEvent(i)]);  // Zips array with EventMap, array dominance.
    const [operators, setOperators] = useState([null]);     // Inital operator is null, initial marble lane.
    const [eventMap, setEventMap] = useState(new EventMap());

    useEffect(() => {
        const subscription = backpageMessageSubject$.pipe(
            filter(message => message.type === 'operator')
        ).subscribe(op => {
            setOperators(ops => [...ops, op]);
        });

        return () => subscription.unsubscribe();
    });

    // // Stream of operators for this observable.
    // const operator$ = backpageMessageSubject$.pipe(
    //     filter(message => message.type === 'operator'),
    //     map(message => message.message),
    //     filter(operator => operator.observable === props.observable),
    //     tap(operator => print(operator)),
    // );

    // // Stream of events for this observable.
    // const event$ = backpageMessageSubject$.pipe(
    //     filter(message => message.type === 'event'),
    //     map(message => message.message),
    //     filter(event => event.observable === props.observable)
    // );

    // useEffect(() => {
    //     const operatorSubscription = operator$.subscribe(operator => {
    //         print(`insidde operator$ sub ${operator}`);
    //         setOperators(operators => [...operators, operator.type]);
    //     });

    //     const eventSubscription = event$.subscribe(event => {
    //         setEventMap(eventMap => eventMap.addEvent(event.uuid, event.data));
    //     });

    //     return () => {
    //         operatorSubscription.unsubscribe();
    //         eventSubscription.unsubscribe();
    //     };
    // }, []);

    return (
        <div className='MarbleDiagram'>
            {operators.map(o => <span>operator</span>)}
            {/* {zip(operators, eventMap).map(set => {
                const [operator, eventMapS] = set;
                print(`operator ${operator}`);
                return <MarbleOperatorSet key={uuid()} operator={operator} marbles={eventMapS} />;
            })} */}
        </div>
    );
};