import React, { createContext, useReducer } from 'react';

export const EventContext = createContext();
export const DispatchContext = createContext();

const initialState = {
    initialEvents: [],
    operatorEvents: [],
    subscribeEvents: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'initial':
            return { ...state, initialEvents: [...state.initialEvents, action.payload] };
        case 'operator':
            return { ...state, operatorEvents: [...state.operatorEvents, action.payload] };
        case 'subscribe':
            return { ...state, subscribeEvents: [...state.subscribeEvents, action.payload] };
        default:
            throw new Error(`Invalid event type given ${action.type}!`);
    }
};

export const EventProvider = (props) => {
    const [events, dispatch] = useReducer(reducer, initialState);

    return (
        <EventContext.Provider value={events}>
            <DispatchContext.Provider value={dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </EventContext.Provider>
    );
};