import { Subject } from 'rxjs';
import { filter, pluck, shareReplay, tap } from 'rxjs/operators';
import { getObservableMock } from './mockMessages';

const backpageMessageSubject$ = new Subject();

const createMessageObservable = (source$, messageType) => {
    return source$.pipe(
        filter(message => message.type === messageType),
        pluck('message'),
        tap(message => console.log(message)),
        shareReplay(100)
    );
};

export let print = msg => console.log(msg); // For development purpose.
export const observable$ = createMessageObservable(backpageMessageSubject$, 'observable');
export const operator$ = createMessageObservable(backpageMessageSubject$, 'operator');
export const event$ = createMessageObservable(backpageMessageSubject$, 'event');
export const reset$ = backpageMessageSubject$.pipe(
    filter(message => message.type === 'reset'),
    pluck('message')
);

const development = true;

if (!development) {
    declare var chrome;

    print = msg => chrome.extension.getBackgroundPage().console.log(msg);

    const backgroundPageConnection = chrome.runtime.connect({
        name: 'messageListener'
    });

    backgroundPageConnection.onMessage.addListener(msg => {
        // print(`message coming in content script ${msg}`);
        backpageMessageSubject$.next(msg);
    });
} else {    // Development Block.
    for (let i = 0; i < 10; i++) {
        backpageMessageSubject$.next(getObservableMock());
    }
    setTimeout(() => backpageMessageSubject$.next(getObservableMock()), 1000);
    setTimeout(() => backpageMessageSubject$.next(getObservableMock()), 1000);

}
// For compilation.





// setTimeout(() => {
//     backpageMessageSubject$.next({ ...observableMessage });
//     backpageMessageSubject$.next({ ...observableMessage });
//     setTimeout(() => {
//         backpageMessageSubject$.next({ ...operatorMessage });
//         backpageMessageSubject$.next({ ...operatorMessage });
//         backpageMessageSubject$.next({ ...operatorMessage });
//         backpageMessageSubject$.next({ ...eventMessage });
//         backpageMessageSubject$.next({ ...eventMessage });
//         backpageMessageSubject$.next({ ...eventMessage });
//         backpageMessageSubject$.next({ ...eventMessage2 });
//         backpageMessageSubject$.next({ ...eventMessage2 });
//         backpageMessageSubject$.next({ ...eventMessage2 });
//         backpageMessageSubject$.next({ ...eventMessage2 });
//     }, 1000);
// }, 1000);