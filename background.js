chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ targetTime: 'HH:mm:ss:SSS' }); // Set the default target time
});

chrome.action.onClicked.addListener(function(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js'],
  });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'pageLoadAlarm') {
    chrome.tabs.create({ url: 'https://coldplayinjakarta.com' }, function(tab) {
      chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo, updatedTab) {
        if (updatedTabId === tab.id && changeInfo.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(listener);
          chrome.scripting.executeScript({
            target: { tabId: updatedTabId },
            files: ['content.js'],
          });
        }
      });
    });
  }
});