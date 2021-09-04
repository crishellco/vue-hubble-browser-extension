<script>
  import { createEventDispatcher } from 'svelte';
  import Toggle from './Toggle.svelte';

  const dispatch = createEventDispatcher();

  export let options = {};

  function handleCommentsChange() {
    dispatch('commentsChange');
  }

  function handleSelectorPickerChange() {
    dispatch('selectorPickerChange');
  }

  function handleDeepNamespacingChange() {
    dispatch('deepNamespacingChange');
  }
</script>

<div>
  <Toggle
    label="Selector Picker Enabled"
    id="selector-picker"
    checked={options.enableSelectorPicker}
    on:change={handleSelectorPickerChange}
  />
  <div class="mt-4">
    <Toggle
      label="Comments Enabled"
      id="comments"
      checked={options.enableComments}
      on:change={handleCommentsChange}
    />
  </div>
  <div class="mt-4">
    <Toggle
      label="Deep Namespacing Enabled"
      id="deep-namespacing"
      checked={options.enableDeepNamespacing}
      on:change={handleDeepNamespacingChange}
    />
  </div>
</div>
