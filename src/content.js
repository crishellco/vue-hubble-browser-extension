import events from './events';

function postMessage(message) {
  chrome.runtime.sendMessage(message)
}

function toggleEnabled () {
  const fn = () => {
    window.$hubble.options.enableSelectorPicker = !window.$hubble.options.enableSelectorPicker;
  }

  const script = document.createElement('script')
  script.text = `(${fn.toString()})();`
  document.documentElement.appendChild(script)

  fetchConfig();
}

function fetchConfig() {
  const fn = () => {
    document.dispatchEvent(new CustomEvent('vue_hubble_get_config', {
      detail: (window.$hubble || {}).options
    }));
  }

  const script = document.createElement('script')
  script.text = `(${fn.toString()})();`
  document.documentElement.appendChild(script)
}

document.addEventListener('vue_hubble_get_config', function({detail: options}) {
  postMessage({type: events.config, value: options});
});

window.onload = () => {
  chrome.runtime.onMessage.addListener(({ type, value }) => {
    if(type === events.toggleSelectorPicker) {
      toggleEnabled()
    }

    if (type === events.getConfig) {
      fetchConfig();
    }
  })
}
