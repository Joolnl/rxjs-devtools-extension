//@ts-check
import { Observable } from 'rxjs';
import { getObservableMock, getOperatorMock } from './mockMessages';

export const observable$ = new Observable();
export const event$ = new Observable();
export const operator$ = new Observable();
export let print = console.log; // For development purpose.

// Mock some messages for development.
const mockMessages = () => {
    return new Observable(subscriber => {
        const observable = getObservableMock();
        dispatchMessage(subscriber, observable);
        dispatchMessage(subscriber, getObservableMock());
        dispatchMessage(subscriber, getOperatorMock(observable.message.uuid));
    });
};

const dispatchMessage = (subscriber, message) => {
    switch (message.type) {
        case 'observable':
            const { message: observable } = message;
            return subscriber.next({ type: 'observable', message: observable });
        case 'operator':
            const { message: operator } = message;
            return subscriber.next({ type: 'operator', message: operator });
        default:
            throw new Error(`Invalid message type ${message.type} !`);
    }
}

const development = true;

// Get promise of message source$.
export const getMessage$ = () => {
    if (development)   // Outside extension there is no chrome object.
        return new Promise(resolve => resolve(mockMessages()));

    declare var chrome; // Declaration required to satisfy compiler, filled by chrome.
    print = msg => chrome.extension.getBackgroundPage().console.log(msg); // Overwrite print to allow content scripts to console.log.
    const backgroundPageConnection = chrome.runtime.connect({
        name: 'messageListener'
    });

    return new Promise(resolve => {
        resolve(
            new Observable(subscriber => {
                backgroundPageConnection.addListener(msg => {
                    // subscriber.next(msg);
                    dispatchMessage(subscriber, msg);
                });
            })
        );
    });
};