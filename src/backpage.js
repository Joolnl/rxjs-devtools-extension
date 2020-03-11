// const bufferedMessages = [];
// let bufferMessagesFlag = false;

// // For compilation.
declare var chrome;

// console.log('coming here');

// const createMessage = (type, message, event = null, subUuid = null) => {
//     return { type, message, event, subUuid };
// };

// // TODO: filter external resources.
// chrome.runtime.onConnect.addListener(port => {
//     port.onDisconnect.addListener(() => {
//         port = null;
//     });

//     // Listen for update events.
//     chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//         if (port) {
//             if (changeInfo.status === 'loading') {
//                 bufferMessagesFlag = true;
//             } else if (changeInfo.status === 'complete') {
//                 bufferMessagesFlag = false;
//                 port.postMessage(createMessage('clear', null));
//                 bufferedMessages.map(message => port.postMessage(message));
//                 bufferedMessages.length = 0;
//             }
//         }
//     });

//     // Listen for external messages. (from script)
//     chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
//         if (port) {
//             // const msg = createMessage(request.detail.messageType, request.detail.metadata,
//             //     request.detail.event, request.detail.subUuid);
//             const msg = request.detail;
//             console.log(msg);
//             console.log(request.detail);
//             bufferMessagesFlag
//                 ? bufferedMessages.push(msg)
//                 : port.postMessage(msg);
//             sendResponse(true);
//         }
//     });
// });


// TODO: filter external resources.
chrome.runtime.onConnect.addListener(port => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (port) {
            if (changeInfo.status === 'loading') {
                port.postMessage({ type: 'reset' });
            }
        }
    });

    chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
        if (port) {
            const msg = request.detail;
            port.postMessage(msg);
            sendResponse(true);
        }
    });
});