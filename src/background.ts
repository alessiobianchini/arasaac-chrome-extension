chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ activeTooltip: true });
  chrome.webNavigation.onCompleted.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
      if (id) {
        chrome.scripting.executeScript({
          target: {tabId: id, allFrames: true},
          files: ['contentScript.js']
        });
        // chrome.action.disable(id);
      }
    });
  });
  

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    (async () => {

      if (request.type === "translate") {
        console.info("TRANSLATE " + Date.now());
        var translatedResult = "ciao";
        sendResponse(translatedResult);
      }
    })();

    return true;
  });
});
