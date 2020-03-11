import { Subject } from 'rxjs';
import { filter, pluck, shareReplay } from 'rxjs/operators';
import { getObservableMock } from './mockMessages';

const backpageMessageSubject$ = new Subject();

const createMessageObservable = (source$, messageType) => {
    return source$.pipe(
        filter(message => message.type === messageType),
        pluck('message'),
        shareReplay(100)
    );
};

export let print = msg => console.log(msg); // For development purpose.
export const observable$ = createMessageObservable(backpageMessageSubject$, 'observable');
export const operator$ = createMessageObservable(backpageMessageSubject$, 'operator');
export const event$ = createMessageObservable(backpageMessageSubject$, 'event');
export const reset$ = backpageMessageSubject$.pipe(
    filter(message => message.type === 'reset'),
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
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            backpageMessageSubject$.next(getObservableMock());
        }
    }, 0);

    setTimeout(() => {
        backpageMessageSubject$.next({type: 'reset'})
    }, 5000);
}