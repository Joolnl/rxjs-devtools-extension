const backgroundPageConnection = chrome.runtime.connect({
    name: "messageListener"
});

backgroundPageConnection.onMessage.addListener(msg => {
    const { type, message, event } = msg;
    switch (type) {
        case 'SubscriptionCreation':
            addSubscription(message);
            break;
        case 'EventPassage':
            addEvent(0, message, event);
            break;
        case 'clear':
            clearPane();
            break;
    }
});
