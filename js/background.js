chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
        // verify `sender.url`, read `request` object, reply with `sednResponse(...)`...
        window.dispatchEvent(new CustomEvent("message", {detail: request.detail}));
    });