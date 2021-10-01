import events from './events';

chrome.runtime.onMessage.addListener(({ type, value }) => {
  if (type === events.checkForHubble) {
    value ? enable() : disable();
  }
});

function enable() {
  chrome.tabs.query({ active: true }, (tabs) => {
    chrome.browserAction.enable(tabs[0].id);
    chrome.browserAction.setIcon({
      tabId: tabs[0].id,
      path: {
        16: 'images/key16.png',
        32: 'images/key32.png',
      },
    });
  });
}

function disable() {
  chrome.tabs.query({ active: true }, (tabs) => {
    chrome.browserAction.disable(tabs[0].id);
    chrome.browserAction.setIcon({
      tabId: tabs[0].id,
      path: {
        16: 'images/key16bw.png',
        32: 'images/key32bw.png',
      },
    });
  });
}

function getInject() {
  const fn = function (event) {
    const fn = (event) => {
      document.dispatchEvent(
        new CustomEvent(event, {
          detail: {
            hubbleDetected: !!(window.$hubble || {}).options,
          },
        })
      );
    };

    const script = document.createElement('script');

    script.text = `
          (${fn.toString()})('${event}');
        `;
    document.documentElement.appendChild(script);

    script.remove();
  };

  return fn.toString();
}

const handleBrowserActionEnablementEvent = (tabId, changeInfo, tab) => {
  if (tab && !tab.url.startsWith('http')) return disable();

  tabId = typeof tabId === 'object' ? tabId.tabId : tabId;

  chrome.tabs.executeScript(tabId, {
    code: `(${getInject()})('${events.checkForHubble}')`,
  });
};

chrome.tabs.onUpdated.addListener(handleBrowserActionEnablementEvent);
chrome.tabs.onActivated.addListener(handleBrowserActionEnablementEvent);
