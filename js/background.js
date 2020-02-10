chrome.runtime.onConnect.addListener(function(port) {
  console.log(port.name);
  port.onMessage.addListener(msg => {
    console.log(msg);
    port.postMessage('test');
  });
  port.postMessage('message from background.js');
  
});