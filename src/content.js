import { Subject } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';

const backpageMessageSubject$ = new Subject();

const createMessageObservable = (source$, messageType) => {
    return source$.pipe(
        filter(message => message.type === messageType),
        map(message => message.message),
        tap(message => print(message)),
        shareReplay(100)
    );
};

export const observable$ = createMessageObservable(backpageMessageSubject$, 'observable');
export const operator$ = createMessageObservable(backpageMessageSubject$, 'operator');
export const event$ = createMessageObservable(backpageMessageSubject$, 'event');

// For compilation.
declare var chrome;

export const print = msg => chrome.extension.getBackgroundPage().console.log(msg);

const backgroundPageConnection = chrome.runtime.connect({
    name: 'messageListener'
});

backgroundPageConnection.onMessage.addListener(msg => {
    // print(`message coming in content script ${msg}`);
    backpageMessageSubject$.next(msg);
});


// const observableMessage = {
//     type: 'observable',
//     message: {
//         uuid: '1',
//         type: 'fromEvent',
//         identifier: 'testObservable',
//         'file': '/app/app_component.ts',
//         'line': 15
//     }
// };

// const observableMessage2 = {
//     type: 'observable',
//     message: {
//         uuid: '7',
//         type: 'fromEvent',
//         identifier: 'testObservable',
//         'file': '/app/app_component.ts',
//         'line': 15
//     }
// };

// const operatorMessage = {
//     type: 'operator',
//     message: {
//         type: 'map',
//         function: 'x => x += 1',
//         observable: '1',
//         file: '/app/app_component.ts',
//         line: 30
//     }
// };

// const eventMessage = {
//     type: 'event',
//     message: {
//         data: '1',
//         observable: '1',
//         uuid: '1',
//         file: '/app/app_component.ts',
//         line: 12
//     }
// };

// const eventMessage2 = {
//     type: 'event',
//     message: {
//         data: 'b',
//         observable: '1',
//         uuid: '2',
//         file: '/app/app_component.ts',
//         line: 12
//     }
// };

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