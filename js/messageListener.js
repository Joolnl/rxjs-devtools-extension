const backgroundPageConnection = chrome.runtime.connect({
    name: "messageListener"
});

backgroundPageConnection.onMessage.addListener(msg => {
    addSubscription(msg);
});
