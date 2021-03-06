<style lang="postcss" global>
  .toggle-checkbox:checked {
    @apply right-0 border-green-400;
  }
  .toggle-checkbox:checked + .toggle-label {
    @apply bg-green-400;
  }

  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

<script>
  import events from '../events';
  import { AllPluginOptions, Loader, Toggles, ZeroState } from './';
  import EnvironmentInput from './EnvironmentInput.svelte';

  let options = {};
  let loading = true;

  $: allOptions = JSON.stringify(options, null, 2);

  $: hasOptions = !!Object.keys(options).length;

  chrome.runtime.onMessage.addListener(({ type, value }) => {
    if (type === events.config) {
      loading = false;
      options = value || {};
    }
  });

  const sendMsgToActiveTab = (message) => {
    chrome.tabs.query({ active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  };

  function handleCommentsChange() {
    toggle('enableComments');
  }

  function handleSelectorPickerChange() {
    toggle('enableSelectorPicker');
  }

  function handleDeepNamespacingChange() {
    toggle('enableDeepNamespacing');
  }

  function handleGroupedSelectorsChange() {
    toggle('enableGroupedSelectors');
  }

  function handleEnvironmentChange(event) {
    update('environment', event.detail.environment);
  }

  function toggle(key) {
    options[key] = !options[key];
    sendMsgToActiveTab({ type: events.toggle, key });
  }

  function update(key, value) {
    options[key] = value;
    sendMsgToActiveTab({ type: events.update, key, value });
  }

  function fetch() {
    sendMsgToActiveTab({ type: events.getConfig });
  }

  function reset() {
    sendMsgToActiveTab({ type: events.reset });
  }

  fetch();
</script>

<div class="p-4 flex flex-col bg-gray-800 min-h-popup" style="width: 20rem">
  {#if loading}
    <Loader />
  {:else if hasOptions}
    <Toggles
      {options}
      on:commentsChange={handleCommentsChange}
      on:selectorPickerChange={handleSelectorPickerChange}
      on:deepNamespacingChange={handleDeepNamespacingChange}
      on:groupedSelectorsChange={handleGroupedSelectorsChange}
    />

    <EnvironmentInput {options} on:change={handleEnvironmentChange} />

    <AllPluginOptions {allOptions} on:reset={reset} />
  {:else}
    <ZeroState />
  {/if}
</div>
