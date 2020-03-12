declare var chrome;

let reloaded = 0;
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && tab.url === 'http://localhost:4200/') {
        if (changeInfo.status === 'loading') {
            reloaded++;
        } else if (changeInfo.status === 'complete') {
            reloaded = 3;
        }
    }
});

const messageListener = port => (request, sender, sendResponse) => {
    if (port) {
        if (reloaded === 4) {
            port.postMessage({ type: 'reset' });
            reloaded = 0;
        }
        const msg = request.detail;
        port.postMessage(msg);
    }
}

// TODO: filter external resources.
chrome.runtime.onConnect.addListener(port => {
    const curried = messageListener(port);

    port.onDisconnect.addListener(() => {
        chrome.runtime.onMessageExternal.hasListener(curried) &&
            chrome.runtime.onMessageExternal.removeListener(curried);
        port = null;
    });

    chrome.runtime.onMessageExternal.addListener(curried);

    // chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    //     if (port) {
    //         if (reloaded === 4) {
    //             port.postMessage({ type: 'reset' });
    //             reloaded = 0;
    //         }
    //         const msg = request.detail;
    //         port.postMessage(msg);
    //     }
    // });
});