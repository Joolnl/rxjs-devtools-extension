import { Subject, Observable, interval, zip } from 'rxjs';
import { filter, pluck, map, tap } from 'rxjs/operators';
import { getObservableMock, getOperatorMock, getEventMock } from './mockMessages';

export const event$ = new Observable();
export let observable$ = new Observable();
export const operator$ = new Observable();
export const reset$ = new Observable();
export let subscription$;

// const backpageMessageSubject$ = new Subject();
// backpageMessageSubject$.subscribe(x => console.log(x));
// const timer$ = interval(1000);
// const test$ = new Subject();
// test$.subscribe(x => console.log(x));
// const backpageMessageSubject$ = new Subject().pipe(tap(x => console.log(x)));
// const backpageMessageSubjectEmiter$ = zip(backpageMessageSubject$, timer$).pipe(
//     map(([value, _]) => value)
// );

// const createMessageObservable = (source$, messageType) => {
//     return source$.pipe(
//         filter(message => message.type === messageType),
//         pluck('message')
//     );
// };

export let print = msg => console.log(msg); // For development purpose.
// export const observable$ = createMessageObservable(backpageMessageSubjectEmiter$, 'observable');
// export const observable$ = new Observable(subscriber => {
//     createMessageObservable(backpageMessageSubject$, 'observable').subscribe(msg => {
//         console.log('this is happening');
//         subscriber.next(msg);
//     });
// });
// export const operator$ = createMessageObservable(backpageMessageSubjectEmiter$, 'operator');
// export const event$ = createMessageObservable(backpageMessageSubjectEmiter$, 'event');
// export const reset$ = backpageMessageSubject$.pipe(
//     filter(message => message.type === 'reset'),
// );

// // TODO: curriedProducer is undefined at return.
// const createObservableWithProducer = () => {
//     let curriedProducer;
//     const producer = subscriber => value => subscriber.next(value);
//     const observable = new Observable(subscriber => {
//         curriedProducer = producer(subscriber);
//     });
//     return [observable, curriedProducer];
// };

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
            // backpageMessageSubject$.next(msg);
            // subscriber.next(msg);
            dispatchMessage(msg, subscriber);
            // if (msg.type === 'operator') {
            //     const { type, line, observable } = msg.message;
            //     print(`type: ${type} on ${line} with observable ${observable} `);
            // }
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

    // // TODO: are they the right observables or too many?
    // subscription$.subscribe(message => {
    //     let counter = 0;
    //     const [observable, observable$] = message;
    //     observable$.subscribe(innerMessage => {
    //         console.log(`inner message ${innerMessage} in subscription ${++counter}`);
    //     });
    // });

    // observable$ = new Observable(subsriber => {
    //     subsriber.next(observableMock);
    // });
    // test$.next(1);
    // setTimeout(() => {
    //     backpageMessageSubject$.next(observableMock);
    // }, 100);
    // setTimeout(() => {
    //     backpageMessageSubject$.next(observable);
    //     backpageMessageSubject$.next(observable);
    // }, 100);
    // setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //         const observable = getObservableMock();
    //         backpageMessageSubject$.next(observable);
    //         setTimeout(() => {
    //             [1, 2, 3].map(() => backpageMessageSubject$.next(getOperatorMock(observable.message.uuid)));
    //             [1, 2, 3, 4].map(() => {
    //                 getEventMock(observable.message.uuid, 4).map(event => backpageMessageSubject$.next(event));
    //             });
    //         }, 100);
    //     }
    // }, 100);

    // setTimeout(() => {
    //     backpageMessageSubject$.next({ type: 'reset' })
    // }, 5000);

}