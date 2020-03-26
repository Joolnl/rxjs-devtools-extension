import React, { createContext, useReducer } from 'react';

export const ObservableContext = createContext();
export const DispatchContext = createContext();

const initalState = {
    observables: [],
    pipes: [],
    operators: [],
    subscribers: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'test':
            console.log(action.payload);
            break;
        default:
            throw new Error('Invalid action type!');
    }
};

export const ObservableProvider = (props) => {
    const [observables, dispatch] = useReducer(reducer, initalState);

    return (
        <ObservableContext.Provider value={observables}>
            <DispatchContext.Provider value={dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </ObservableContext.Provider>
    )
};