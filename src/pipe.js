import React, { useContext } from 'react';
import { ObservableContext } from './contexts/observableContext';
import * as uuid from 'uuid/v4';
import './pipe.css';
import Operator from './operator';
import MarbleLane from './marbleLane';
import { EventContext } from './contexts/eventContext';

export default function Pipe(props) {
    const { operators } = useContext(ObservableContext);
    const { initialEvents, operatorEvents } = useContext(EventContext);

    const initialEventData = () => {
        return initialEvents.map(event => event.data);
    };

    const eventsForOperator = operator => {
        return operatorEvents
            .filter(event => event.receiver === operator)
            .map(event => event.data);
    };

    return (
        <div className='Pipe'>
            {/* For initial marbles */}
            <MarbleLane marbles={initialEventData()} />
            {operators
                .filter(operator => operator.pipe === props.pipe)
                .map(operator => {
                    return (
                        <div key={uuid()} className='operatorMarbleSet'>
                            <Operator uuid={operator.uuid} fn={operator.type} />
                            <MarbleLane marbles={eventsForOperator(operator.uuid)} />
                        </div>
                    );
                })
            }
        </div>
    );
}