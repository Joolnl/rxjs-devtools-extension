const backgroundPageConnection = chrome.runtime.connect({
    name: "messageListener"
});

backgroundPageConnection.onMessage.addListener(msg => {
    const { type, message, event, subUuid } = msg;
    switch (type) {
        case 'SubscriptionCreation':
            addSubscription(message);
            break;
        case 'EventPassage':
            addEvent(subUuid, message, event);
            break;
        case 'clear':
            clearPane();
            break;
    }
});
