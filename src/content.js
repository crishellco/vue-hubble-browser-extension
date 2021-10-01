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

function update(key, value) {
  const fn = (optionKey, newValue) => {
    window.$hubble.options[optionKey] = newValue;
  };

  const script = document.createElement('script');
  script.text = `
    (${fn.toString()})('${key}', ${JSON.stringify(value)});
  `;
  document.documentElement.appendChild(script);

  script.remove();
}

function reset() {
  const fn = () => {
    window.$hubble.resetOptions();
  };

  const script = document.createElement('script');
  script.text = `
    (${fn.toString()})();
  `;
  document.documentElement.appendChild(script);

  script.remove();

  fetchConfig(false);
}

document.addEventListener(
  events.checkForHubble,
  function ({ detail: { hubbleDetected } }) {
    postMessage({ type: events.checkForHubble, value: hubbleDetected });
  }
);

function fetchConfig(withMinDuration = true) {
  if (withMinDuration) {
    promise = new Promise((resolve) =>
      setTimeout(resolve, constants.minFetchDuration)
    );
  } else {
    promise = Promise.resolve();
  }

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
  events.getConfigFromDom,
  function ({ detail: { options } }) {
    promise.then(() => postMessage({ type: events.config, value: options }));
  }
);

window.onload = () => {
  chrome.runtime.onMessage.addListener(({ type, key, value }) => {
    if (type === events.toggle) {
      toggle(key);
    }

    if (type === events.update) {
      update(key, value);
    }

    if (type === events.getConfig) {
      fetchConfig();
    }

    if (type === events.reset) {
      reset();
    }
  });
};
