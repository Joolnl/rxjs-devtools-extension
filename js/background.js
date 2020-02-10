// TODO: filter external resources.
chrome.runtime.onConnect.addListener(port => {
  port.onDisconnect.addListener(() => {
    port = null;
  });

  chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    if (port)
      port.postMessage(request.detail);
  });
});
