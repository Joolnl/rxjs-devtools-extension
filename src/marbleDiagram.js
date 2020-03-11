import React, { useReducer, useLayoutEffect } from 'react';
import './devtoolsPane.css';
import { operator$, event$ } from './content';
import * as uuid from 'uuid/v4';
import Operator from './operator';
import MarbleLane from './marbleLane';
import { filter } from 'rxjs/operators';

// For storing events in a tow-dimensional fashion.
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

// For setting event and operator state.
const reducer = (state, action) => {
    // print(state);
    switch (action.type) {
        case 'event':
            return { ...state, events: state.events.addEvent(action.payload.uuid, JSON.stringify(action.payload.data)) };
        case 'operator':
            return { ...state, operators: [...state.operators, action.payload] };
        default:
            throw new Error('Invalid reducer action.type!');
    }
};

// Initial event and operator state.
const initialState = {
    operators: [null],
    events: new EventMap()
};

export default function DevtoolsPane(props) {
    const createOperatorString = (type, fn) => `${type}( ${fn} )`;
    const [state, dispatch] = useReducer(reducer, initialState);
    const zip = (a1, m2) => a1.map((x, i) => [x, m2.getNthEvent(i)]);  // Zips array with EventMap, array dominance.

    useLayoutEffect(() => {
        const operatorSubscription = operator$.pipe(
            filter(operator => operator.observable === props.observable)
        ).subscribe(operator => {
            dispatch({ type: 'operator', payload: createOperatorString(operator.type, operator.function) });
        });

        const eventSubscription = event$.pipe(
            filter(event => event.observable === props.observable)
        ).subscribe(event => {
            dispatch({ type: 'event', payload: event });
        });

        return () => {
            console.log('unmounting!')
            operatorSubscription.unsubscribe();
            eventSubscription.unsubscribe();
        };
    }, []);

    return (
        <div className='MarbleDiagram'>
            {
                zip(state.operators, state.events).map(set => {
                    const [operator, events] = set;
                    // print(events);
                    return <div key={uuid()}>
                        {operator && <Operator key={uuid()} fn={operator}></Operator>}
                        <MarbleLane key={uuid()} marbles={events}></MarbleLane>
                    </div>
                })
            }
        </div>
    );
}