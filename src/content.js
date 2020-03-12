import { Subject } from 'rxjs';
import { filter, pluck, tap } from 'rxjs/operators';
import { getObservableMock, getOperatorMock, getEventMock } from './mockMessages';

const backpageMessageSubject$ = new Subject();

const createMessageObservable = (source$, messageType) => {
    return source$.pipe(
        // tap(message => print(message.type)),
        filter(message => message.type === messageType),
        pluck('message')
    );
};

export let print = msg => console.log(msg); // For development purpose.
export const observable$ = createMessageObservable(backpageMessageSubject$, 'observable');
export const operator$ = createMessageObservable(backpageMessageSubject$, 'operator');
export const event$ = createMessageObservable(backpageMessageSubject$, 'event');
export const reset$ = backpageMessageSubject$.pipe(
    filter(message => message.type === 'reset'),
);

const development = false;
print = msg => chrome.extension.getBackgroundPage().console.log(msg);


if (!development) {
    declare var chrome;

    print = msg => chrome.extension.getBackgroundPage().console.log(msg);

    const backgroundPageConnection = chrome.runtime.connect({
        name: 'messageListener'
    });


    backgroundPageConnection.onMessage.addListener(msg => {
        backpageMessageSubject$.next(msg);
        print(msg);
    });

} else {    // Development Block.
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            const observable = getObservableMock();
            backpageMessageSubject$.next(observable);
            setTimeout(() => {
                [1, 2, 3].map(() => backpageMessageSubject$.next(getOperatorMock(observable.message.uuid)));
                [1, 2, 3, 4].map(() => {
                    getEventMock(observable.message.uuid, 4).map(event => backpageMessageSubject$.next(event));
                });
            }, 100);
        }
    }, 100);

    setTimeout(() => {
        backpageMessageSubject$.next({type: 'reset'})
    }, 5000);

}