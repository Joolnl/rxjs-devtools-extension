import * as uuid from 'uuid/v4';

const getRandomObservableType = () => {
    const observableTypes = ['ajax', 'bindCallback', 'bindNodeCallback', 'defer', 'empty', 'from', 'fromEvent',
        'fromEventPattern', 'generate', 'interval', 'of', 'range', 'throwError', 'timer', 'iif'];
    return observableTypes[Math.floor(Math.random() * observableTypes.length)];
}

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

export const getOperatorMock = observable => {
    return {
        type: 'operator',
        message: {
            uuid: uuid(),
            type: getRandomOperatorType(),
            function: 'x => x += 1',
            observable: observable,
            file: 'mockMessages.js',
            line: 37
        }
    }
}

export const getEventMock = (observable, phases) => {
    const id = uuid();
    const result = [];
    for (let i = 0; i < phases; i++) {
        result.push(
            {
                type: 'event',
                message: {
                    data: getRandomInteger(),
                    observable: observable,
                    uuid: id,
                    file: 'mockMessages.js',
                    line: 53
                }
            }
        );
    }
    return result;
};

const eventMessage = {
    type: 'event',
    message: {
        data: '1',
        observable: '1',
        uuid: '1',
        file: '/app/app_component.ts',
        line: 12
    }
};

const eventMessage2 = {
    type: 'event',
    message: {
        data: 'b',
        observable: '1',
        uuid: '2',
        file: '/app/app_component.ts',
        line: 12
    }
};