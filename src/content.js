import { Observable } from 'rxjs';

export const observable$ = new Observable();
export const event$ = new Observable();
export const operator$ = new Observable();
export let print = console.log; // For development purpose.

const mockMessages = () => {
    return new Observable(subscriber => {
        subscriber.next('Hello World.');
    });
};

const development = true;
export const getMessage$ = () => {
    if (development)
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
                    subscriber.next(msg);
                });
            })
        );
    });
};

// const timer$ = interval(10);
// const backpageMessageSubject$ = new Subject();
// const backpageMessageSubjectEmiter$ = zip(backpageMessageSubject$, timer$).pipe(
//     map(([value, _]) => value)
// );

// const createMessageObservable = (source$, messageType) => {
//     return source$.pipe(
//         filter(message => message.type === messageType),
//         pluck('message')
//     );
// };

// export let print = msg => console.log(msg); // For development purpose.
// export const observable$ = createMessageObservable(backpageMessageSubjectEmiter$, 'observable');
// export const operator$ = createMessageObservable(backpageMessageSubjectEmiter$, 'operator');
// export const event$ = createMessageObservable(backpageMessageSubjectEmiter$, 'event');
// export const reset$ = backpageMessageSubject$.pipe(
//     filter(message => message.type === 'reset'),
// );

// const development = true;
// if (!development) {
//     declare var chrome;

//     print = msg => chrome.extension.getBackgroundPage().console.log(msg);

//     const backgroundPageConnection = chrome.runtime.connect({
//         name: 'messageListener'
//     });


//     backgroundPageConnection.onMessage.addListener(msg => {
//         backpageMessageSubject$.next(msg);
//         if (msg.type === 'operator') {
//             const { type, line, observable } = msg.message;
//             print(`type: ${type} on ${line} with observable ${observable} `);
//         }
//     });

// } else {    // Development Block.
//     setTimeout(() => {
//         for (let i = 0; i < 10; i++) {
//             const observable = getObservableMock();
//             backpageMessageSubject$.next(observable);
//             setTimeout(() => {
//                 [1, 2, 3].map(() => backpageMessageSubject$.next(getOperatorMock(observable.message.uuid)));
//                 [1, 2, 3, 4].map(() => {
//                     getEventMock(observable.message.uuid, 4).map(event => backpageMessageSubject$.next(event));
//                 });
//             }, 100);
//         }
//     }, 100);

//     setTimeout(() => {
//         backpageMessageSubject$.next({ type: 'reset' })
//     }, 5000);

// }