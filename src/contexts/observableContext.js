import React, { createContext, useReducer } from 'react';

export const ObservableContext = createContext();
export const DispatchContext = createContext();

const initialState = {
    observables: [],
    pipes: [],
    operators: [],
    subscribers: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'observable':
            return { ...state, observables: [...state.observables, action.payload] };
        case 'pipe':
            return { ...state, pipes: [...state.pipes, action.payload] };
        case 'operator':
            return { ...state, operators: [...state.operators, action.payload] };
        case 'subscription':
            return { ...state, subscribers: [...state.subscribers, action.payload] };
        case 'reset':
            return initialState;
        default:
            throw new Error(`Invalid action type ${action.type}!`);
    }
};

export const ObservableProvider = (props) => {
    const [observables, dispatch] = useReducer(reducer, initialState);

    return (
        <ObservableContext.Provider value={observables}>
            <DispatchContext.Provider value={dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </ObservableContext.Provider>
    )
};