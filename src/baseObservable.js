import React, { useContext, useState } from 'react';
import { ObservableContext } from './contexts/observableContext';
import Pipe from './pipe';
import * as uuid from 'uuid/v4';
import './baseObservable.css';

// Observable component inside merge observables.
export default function BaseObservable(props) {
    const [open, setOpen] = useState(false);
    const { pipes } = useContext(ObservableContext);

    const openObservable = () => {
        setOpen(!open);
    };

    const getPipes = () => {
        return pipes.filter(pipe => pipe.observable === props.uuid)
    };

    return (
        <div className='BaseObservable'>
            <div className={`header${open ? ' open' : ''}`} onClick={openObservable}>
                <span>{props.identifier}</span>
                <span>{props.type}</span>
            </div>
            <div className={`pipe${open ? ' open' : ''}`}>
                {getPipes().map(pipe => {
                    return (
                        <div key={uuid()}>
                            <span>pipe {pipe.uuid}</span>
                            <Pipe pipe={pipe.uuid} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};