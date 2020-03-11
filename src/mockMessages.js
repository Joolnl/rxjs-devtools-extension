import * as uuid from 'uuid/v4';

const getRandomObservableType = () => {
    const observableTypes = ['ajax', 'bindCallback', 'bindNodeCallback', 'defer', 'empty', 'from', 'fromEvent',
        'fromEventPattern', 'generate', 'interval', 'of', 'range', 'throwError', 'timer', 'iif'];
    return observableTypes[Math.floor(Math.random() * observableTypes.length)];
}

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

const observableMessage = {
    type: 'observable',
    message: {
        uuid: '1',
        type: 'fromEvent',
        identifier: 'testObservable',
        'file': '/app/app_component.ts',
        'line': 15
    }
};

const observableMessage2 = {
    type: 'observable',
    message: {
        uuid: '7',
        type: 'fromEvent',
        identifier: 'testObservable',
        'file': '/app/app_component.ts',
        'line': 15
    }
};

const operatorMessage = {
    type: 'operator',
    message: {
        type: 'map',
        function: 'x => x += 1',
        observable: '1',
        file: '/app/app_component.ts',
        line: 30
    }
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