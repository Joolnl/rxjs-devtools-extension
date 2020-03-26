import { Subject, Observable, interval, zip } from 'rxjs';
import { filter, pluck, map, tap } from 'rxjs/operators';
import { getObservableMock, getOperatorMock, getEventMock } from './mockMessages';

export const event$ = new Observable();
export let observable$ = new Observable();
export const operator$ = new Observable();
export const reset$ = new Observable();
export let subscription$;

export let print = msg => console.log(msg); // For development purpose.


const subjects = new Map();
const dispatchMessage = (message, subscriber) => {
    switch (message.type) {
        case 'observable':  // Create observable from producer, register producer, pass along observable.
            const subject = new Subject();
            subjects.set(message.message.uuid, subject);
            subscriber.next([message, subject]);
            break;
        case 'event':
            // console.log(`uuid ${message.message.observable} producers has ${subjects.has(message.message.observable)} size ${subjects.size}`);
            console.log(`subjects size: ${subjects.size}`)
            subjects.get(message.message.observable).next('hello world');
            // producers.get(message.message.uuid)('test');
            // pass subscription along in appropriate observable.
            break;
        default:
            throw new Error('Invalid message type given!');
    }
};

export const getSubscription$ = () => {
    return new Promise(resolve => {
        resolve(
            subscription$ = new Observable(subscriber => {
                dispatchMessage(getObservableMock(), subscriber);
            })
        );
    });
};

const development = true;
if (!development) {
    declare var chrome;

    print = msg => chrome.extension.getBackgroundPage().console.log(msg);

    const backgroundPageConnection = chrome.runtime.connect({
        name: 'messageListener'
    });


    // TODO: on ea observable message, create new observable and send to observable$ along metadata
    // TODO: each created observable must be stored under observable uuid
    // TODO: each non-observable message must be sent in new observables.
    subscription$ = new Observable(subscriber => {
        backgroundPageConnection.onMessage.addListener(msg => {
            dispatchMessage(msg, subscriber);
        });
    });

    observable$ = subscription$.pipe(
        filter(message => message.type === 'observable'),
        pluck('message')
    );
} else {    // Development Block.
    subscription$ = new Observable(subscriber => {
        const observableMock = getObservableMock();
        const eventMock = getEventMock(observableMock.message.uuid, 4);
        dispatchMessage(observableMock, subscriber);
        dispatchMessage(eventMock.pop(), subscriber);
        dispatchMessage(eventMock.pop(), subscriber);
        dispatchMessage(eventMock.pop(), subscriber);
        dispatchMessage(getObservableMock(), subscriber);
        dispatchMessage(eventMock.pop(), subscriber);
    });
}