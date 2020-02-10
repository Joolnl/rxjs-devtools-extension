const handleBackgroundMessages = message => {
    addSubscription(message.subscriptionType);
};

const backgroundPageConnection = chrome.runtime.connect({
    name: "messageListener"
});

backgroundPageConnection.onMessage.addListener(msg => {
    addSubscription('test');
});