const panels = chrome.devtools.panels;
const rxjsPanel = panels.create(
    "RxJS",
    null,
    "html/pane.html"
);

// DevTools page -- devtools.js
// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    name: "devtools.js"
});

backgroundPageConnection.onMessage.addListener(function (message) {
    console.log(message);
    alert('asd');
});

// Relay the tab ID to the background page
chrome.runtime.sendMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    scriptToInject: "messageListener.js"
});

// backgroundPageConnection.sendMessage('test');