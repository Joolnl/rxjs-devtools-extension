const backgroundPageConnection = chrome.runtime.connect({
    name: "messageListener"
});

backgroundPageConnection.onMessage.addListener(event => {
    const {type, message} = event;
    switch (type) {
        case 'create_subscription':
            addSubscription(message);
            break;
        case 'create_event':
            addEvent(0, 'testEvent');
            break;
        case 'clear':
            clearPane();
            break;
    }
});
