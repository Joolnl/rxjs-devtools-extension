declare var chrome;
const panels = chrome.devtools.panels;
const rxjsPanel = panels.create(
    "RxJS React",
    null,
    "index.html"

);
