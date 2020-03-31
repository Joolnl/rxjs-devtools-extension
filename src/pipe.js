import React, { useContext } from 'react';
import { ObservableContext } from './contexts/observableContext';
import * as uuid from 'uuid/v4';
import './pipe.css';
import Operator from './operator';

export default function Pipe(props) {
    const { operators } = useContext(ObservableContext);

    return (
        <div className='Pipe'>
            {operators
                .filter(operator => operator.pipe === props.pipe)
                .map(operator => {
                    return <Operator key={uuid()} fn={operator.type} />
                })
            }
        </div>
    );
}