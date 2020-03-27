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

let test = function() {

}
const development = true;
export const getMessage$ = () => {
    if (development)    // Outside extension there is no chrome object.
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