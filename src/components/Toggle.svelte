<script>
  import { createEventDispatcher } from 'svelte';

  export let label = '';
  export let id = '';
  export let checked = false;

  const dispatch = createEventDispatcher();

  const change = () => {
    dispatch('change');
  };
</script>

<div class="flex items-center justify-between">
  <label for="toggle" class="text-base font-semibold text-gray-100">
    {label}
  </label>
  <div class="relative inline-block w-10 mr-2 align-middle select-none">
    <input
      {checked}
      on:change={change}
      type="checkbox"
      name={id}
      {id}
      class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white
    border-4 appearance-none cursor-pointer border-gray-500"
    />
    <label
      for={id}
      class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-500
    cursor-pointer"
    />
  </div>
</div>
