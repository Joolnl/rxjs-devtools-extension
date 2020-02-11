const backgroundPageConnection = chrome.runtime.connect({
    name: "messageListener"
});

backgroundPageConnection.onMessage.addListener(event => {
    const {type, message} = event;
    switch (type) {
        case 'create_subscription':
            addSubscription(message);
            break;
        case 'clear':
            clearPane();
            break;
    }
    // chrome.extension.getBackgroundPage().console.log(`${type} ${message}`);
    // addSubscription(msg);
});
