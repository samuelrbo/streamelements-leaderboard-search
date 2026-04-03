chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'streamElementsLeaderboardSearch',
    title: 'StreamElements Leaderboard Search',
    contexts: ['all'],
  });
  chrome.tabs.create({ url: '../pages/options/index.html' });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'streamElementsLeaderboardSearch') {
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

chrome.runtime.onMessage.addListener((message, sender) => {
  (async () => {
    if (message.type === 'open_side_panel') {
      await chrome.sidePanel.open({ tabId: sender.tab.id });
      await chrome.sidePanel.setOptions({
        tabId: sender.tab.id,
        path: '../pages/options/index.html',
        enabled: true,
      });
    }
  })();
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
