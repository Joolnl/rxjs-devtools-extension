//@ts-check
import { Observable, Subject } from 'rxjs';
import { getObservableMock } from './mockMessages';

export const observable$ = new Observable();
export const event$ = new Observable();
export const operator$ = new Observable();
export let print = console.log; // For development purpose.

// Mock some messages for development.
const mockMessages = () => {
    return new Observable(subscriber => {
        // subscriber.next('Hello World.');
        dispatchMessage(subscriber, getObservableMock())
    });
};

const childs$ = new Map();

// Dispatch given message over given subscriber.
const dispatchMessage = (subscriber, message) => {
    switch (message.type) {
        case 'observable':
            const { message: observable } = message;
            observable.child$ = new Subject();
            childs$.set(observable.uuid, observable.child$);
            subscriber.next({ type: 'observable', message: observable }); break;
    }
}

const development = true;

// Get message source$.
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