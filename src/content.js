//@ts-check
import { Observable } from 'rxjs';
import { getObservableMock, getOperatorMock, getPipeMock, getSubscriptionMock, getEventMock } from './mockMessages';

export const observable$ = new Observable();    //@TODO: Deprecated.
export const event$ = new Observable(); //@TODO: Deprecated.
export const operator$ = new Observable();  //@TODO: Deprecated.
export let print = console.log; // For development purpose.

// Mock some messages for development.
const mockMessages = () => {
    return new Observable(subscriber => {
        const observable = getObservableMock();
        const pipe = getPipeMock(observable.message.uuid);
        const pipe2 = getPipeMock(observable.message.uuid);
        const operator1  = getOperatorMock(observable.message.uuid, pipe.message.uuid);
        dispatchMessage(subscriber, observable);
        dispatchMessage(subscriber, getObservableMock());
        dispatchMessage(subscriber, pipe);
        dispatchMessage(subscriber, pipe2);
        dispatchMessage(subscriber, operator1);
        dispatchMessage(subscriber, getOperatorMock(observable.message.uuid, pipe.message.uuid));
        dispatchMessage(subscriber, getOperatorMock(observable.message.uuid, pipe.message.uuid));
        dispatchMessage(subscriber, getOperatorMock(observable.message.uuid, pipe2.message.uuid));
        dispatchMessage(subscriber, getSubscriptionMock(observable.message.uuid, [pipe.message.uuid]));
        dispatchMessage(subscriber, getSubscriptionMock(observable.message.uuid, []));
        dispatchMessage(subscriber, getSubscriptionMock(observable.message.uuid, [pipe2.message.uuid]));
        dispatchMessage(subscriber, getEventMock('1', pipe, 'initial'));
        dispatchMessage(subscriber, getEventMock('2', pipe, 'initial'));
        dispatchMessage(subscriber, getEventMock('3', pipe, 'initial'));
        dispatchMessage(subscriber, getEventMock('1', operator1.message.uuid, 'operator'));
        dispatchMessage(subscriber, getEventMock('2', operator1.message.uuid, 'operator'));
        dispatchMessage(subscriber, getEventMock('3', operator1.message.uuid, 'operator'));
    });
};

// Pass message along to subscriber.
const dispatchMessage = (subscriber, message) => {
    switch (message.type) {
        case 'observable':
            const { message: observable } = message;
            return subscriber.next({ type: 'observable', message: observable });
        case 'pipe':
            const { message: pipe } = message;
            return subscriber.next({ type: 'pipe', message: pipe });
        case 'operator':
            const { message: operator } = message;
            return subscriber.next({ type: 'operator', message: operator });
        case 'subscription':
            const { message: subscription } = message;
            return subscriber.next({ type: 'subscription', message: subscription });
        case 'event':
            const { message: event } = message;
            return subscriber.next({ type: 'event', message: event });
        default:
            throw new Error(`Invalid message type ${message.type}!`);
    }
}

// Development flag.
const development = true;

// Get promise of message source$.
export const getMessage$ = () => {
    if (development)   // Outside extension there is no chrome object, return mocked messages for development.
        return new Promise(resolve => resolve(mockMessages()));

    declare var chrome; // Declaration required to satisfy compiler, filled by chrome.
    print = msg => chrome.extension.getBackgroundPage().console.log(msg); // Overwrite print to allow content scripts to console.log.
    const backgroundPageConnection = chrome.runtime.connect({
        name: 'messageListener'
    });

    return new Promise(resolve => {
        resolve(
            new Observable(subscriber => {
                backgroundPageConnection.onMessage.addListener(msg => {
                    // subscriber.next(msg);
                    dispatchMessage(subscriber, msg);
                });
            })
        );
    });
};