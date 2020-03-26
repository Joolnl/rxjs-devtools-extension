import React, { createContext, useReducer } from 'react';

export const ObservableContext = createContext();

const initalState = {
    observables: [],
    pipes: [],
    operators: [],
    subscribers: []
}

const reducer = (action, payload) => {
    switch (action.type) {
        default:
            throw new Error('Invalid action type!');
    }
};

export const ObservableProvider = (props) => {
    const [observables, dispatch] = useReducer(reducer, initalState);

    return (
        <ObservableContext.Provider value={observables, dispatch}>
            {props.children}
        </ObservableContext.Provider>
    )
};