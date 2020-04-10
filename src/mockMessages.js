import * as uuid from 'uuid/v4';

const getRandomObservableType = () => {
    const observableTypes = ['ajax', 'bindCallback', 'bindNodeCallback', 'defer', 'empty', 'from', 'fromEvent',
        'fromEventPattern', 'generate', 'interval', 'of', 'range', 'throwError', 'timer', 'iif'];
    return observableTypes[Math.floor(Math.random() * observableTypes.length)];
}

const getRandomJoinObservableType = () => {
    const observableTypes = ['combineLatest', 'concat', 'forkJoin', 'merge', 'race', 'zip'];
    return observableTypes[Math.floor(Math.random() * observableTypes.length)];
};

const getRandomOperatorType = () => {
    const operators = ['buffer', 'bufferCount', 'bufferTime', 'bufferToggle', 'bufferWhen', 'concatMap', 'concatMapTo',
        'exhaust', 'exhaustMap', 'expand', 'groupBy', 'map', 'mapTo', 'mergeMap', 'mergeMapTo', 'mergeScan', 'pairwise',
        'partition', 'pluck', 'scan', 'switchMap', 'switchMapTo', 'window', 'windowCount', 'windowTime', 'windowToggle',
        'windowWhen', 'audit', 'auditTime', 'debounce', 'debounceTime', 'distinct', 'distinctKey', 'distinctUntilChanged',
        'distinctUntilKeyChanged', 'elementAt', 'filter', 'first', 'ignoreElements', 'last', 'sample', 'sampleTime',
        'single', 'skip', 'skipLast', 'skipUntil', 'skipWhile', 'take', 'takeLast', 'takeUntil', 'takeWhile', 'throttle', 'throttleTime'];
    return operators[Math.floor(Math.random() * operators.length)];
}

const getRandomInteger = () => Math.floor(Math.random() * 100);

let counter = 0;
const getUniqueIdentifier = name => {
    return `${name}${counter++}`;
}

export const getObservableMock = () => {
    return {
        type: 'observable',
        message: {
            uuid: uuid(),
            type: getRandomObservableType(),
            identifier: getUniqueIdentifier('Observable'),
            file: 'mockMessages.js',
            line: 14
        }
    };
}

export const getJoinObservableMock = (observables) => {
    return {
        type: 'joinObservable',
        message: {
            uuid: uuid(),
            type: getRandomJoinObservableType(),
            observables: observables.map(id => {
                return {
                    uuid: id,
                    identifier: getUniqueIdentifier('base observable'),
                    type: getRandomObservableType()
                };
            }),
            identifier: getUniqueIdentifier('Observable'),
            file: 'mockMessages.js',
            line: 14
        }
    };
}

export const getPipeMock = observable => {
    return {
        type: 'pipe',
        message: {
            uuid: uuid(),
            observable: observable,
            identifier: 'anonymous',
            file: 'mockMessages.js',
            line: 39
        }
    };
}

export const getOperatorMock = (observable, pipe = null) => {
    return {
        type: 'operator',
        message: {
            uuid: uuid(),
            type: getRandomOperatorType(),
            function: 'x => x += 1',
            observable: observable,
            pipe: pipe,
            file: 'mockMessages.js',
            line: 37
        }
    }
}

export const getSubscriptionMock = (observable, pipes) => {
    return {
        type: 'subscribe',
        message: {
            uuid: uuid(),
            observable: observable,
            pipes: pipes,
            function: '(x => console.log(x))',
            file: 'mockMessages.js',
            line: 66
        }
    };
};

export const getEventMock = (id, observable, receiver, eventType) => {
    return {
        type: 'event',
        message: {
            id: id,
            observable,
            data: getRandomInteger(),
            receiver,
            type: eventType,
            file: 'mockMessages.js',
            line: 80
        }
    }
};