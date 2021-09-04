<script>
  import events from '../events';
  
  let enabled
  let options

  chrome.runtime.onMessage.addListener(({ type, value }) => {
    if (type === events.config) {
      options = value
      enabled = !!(options || {}).enableSelectorPicker
    }
  })

  const sendMsgToActiveTab = (message) => {
    chrome.tabs.query({ active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, message)
    })
  }

  function handleChange() {
    sendMsgToActiveTab({ type: events.toggleSelectorPicker })
  }

  sendMsgToActiveTab({ type: events.getConfig })
</script>


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

<div class="p-4 flex flex-col bg-gray-800" style="width: 20rem">
  {#if !!options}
  <div class="flex items-center justify-between">
    <label for="toggle" class="text-md font-semibold text-indigo-300">
      Selector Picker
    </label>
    <div class="relative inline-block w-10 mr-2 align-middle select-none">
      <input
        checked={enabled}
        on:change={handleChange}
        type="checkbox"
        name="toggle"
        id="toggle"
        class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white
        border-4 appearance-none cursor-pointer" />
      <label
        for="toggle"
        class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-500
        cursor-pointer" />
    </div>
  </div>
  {/if}
</div>
