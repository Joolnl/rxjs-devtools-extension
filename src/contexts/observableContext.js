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
        case 'observable':
            console.log(action.payload);
            return { ...state, observables: [...state.observables, action.payload] };
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