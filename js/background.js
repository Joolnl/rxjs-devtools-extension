chrome.runtime.onConnect.addListener(port => {
  // port.onMessage.addListener(msg => {
  //   port.postMessage('test');
  // });
  console.log(port.name);
  port.postMessage({
    subscriptionType: 'fromEvent'
  });
  
});