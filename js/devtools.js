const panels = chrome.devtools.panels;
const rxjsPanel = panels.create(
    "RxJS",
    null,
    "html/pane.html"
);

var backgroundPageConnection = chrome.runtime.connect({
    name: "test"
});


backgroundPageConnection.postMessage('message from devtools.js');

backgroundPageConnection.onMessage.addListener(msg => alert(msg));
