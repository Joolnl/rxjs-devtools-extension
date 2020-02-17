const bufferedMessages = [];
let bufferMessagesFlag = false;

const createMessage = (type, message, event = null) => {
  return { type, message, event };
};

// TODO: filter external resources.
chrome.runtime.onConnect.addListener(port => {
  port.onDisconnect.addListener(() => {
    port = null;
  });

  // Listen for update events.
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (port) {
      if (changeInfo.status === 'loading') {
        bufferMessagesFlag = true;
      } else if (changeInfo.status === 'complete') {
        bufferMessagesFlag = false;
        port.postMessage(createMessage('clear', null));
        bufferedMessages.map(message => port.postMessage(message));
        bufferedMessages.length = 0;
      }
    }
  });

  // Listen for external messages. (from script)
  chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if (port) {
      const msg = createMessage(request.detail.messageType, request.detail.metadata, request.detail.event);
      bufferMessagesFlag
        ? bufferedMessages.push(msg)
        : port.postMessage(msg);

      // const msg2 = createMessage('create_event', 1);
      // if (!bufferMessagesFlag) {
      //   port.postMessage(msg2);
      // } else {
      //   bufferedMessages.push(msg2);
      // }
    }
  });
});