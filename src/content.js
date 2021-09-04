import constants from './constants';
import events from './events';

let promise;

function postMessage(message) {
  chrome.runtime.sendMessage(message);
}

function toggle(key) {
  const fn = (optionKey) => {
    window.$hubble.options[optionKey] = !window.$hubble.options[optionKey];
  };

  const script = document.createElement('script');
  script.text = `
    (${fn.toString()})('${key}');
  `;
  document.documentElement.appendChild(script);

  script.remove();
}

function fetchSelectors() {
  const fn = () => {
    var selectors = [...document.querySelectorAll('[vue-hubble]')].map(
      (el) => ({
        selector: el.getAttribute('data-vue-hubble-selector'),
        tagName: el.tagName,
      })
    );

    document.dispatchEvent(
      new CustomEvent('get_selectors_from_dom', {
        detail: {
          selectors,
        },
      })
    );
  };

  const script = document.createElement('script');
  script.text = `
    (${fn.toString()})();
  `;
  document.documentElement.appendChild(script);

  // script.remove();
}

function fetchConfig() {
  promise = new Promise((resolve) =>
    setTimeout(resolve, constants.minFetchDuration)
  );

  const fn = (getConfigFromDom) => {
    document.dispatchEvent(
      new CustomEvent(getConfigFromDom, {
        detail: {
          options: (window.$hubble || {}).options,
        },
      })
    );
  };

  const script = document.createElement('script');

  script.text = `
    (${fn.toString()})('${events.getConfigFromDom}');
  `;
  document.documentElement.appendChild(script);

  script.remove();
}

document.addEventListener(
  'get_selectors_from_dom',
  function ({ detail: { selectors } }) {
    postMessage({ type: 'selectors', value: selectors });
  }
);

document.addEventListener(
  events.getConfigFromDom,
  function ({ detail: { options } }) {
    promise.then(() => postMessage({ type: events.config, value: options }));
  }
);

window.onload = () => {
  chrome.runtime.onMessage.addListener(({ type, key }) => {
    if (type === events.toggle) {
      toggle(key);
    }

    if (type === events.getConfig) {
      fetchConfig();
    }

    if (type === 'get_selectors') {
      fetchSelectors();
    }
  });
};
