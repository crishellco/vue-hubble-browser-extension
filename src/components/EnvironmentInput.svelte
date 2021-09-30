<script>
  import { createEventDispatcher } from 'svelte';

  export let options = {};

  function joinEnvironments(options) {
    return options.environment ? options.environment.join() : '';
  }

  $: joinedEnvironments = joinEnvironments(options);

  const dispatch = createEventDispatcher();

  function handleEnvironmentsInput(event) {
    dispatch('change', {
      environment: event.target.value
        .split(',')
        .map((str) => str.trim())
        .filter((str) => str),
    });
  }
</script>

<div class="mt-4">
  <div class="text-base font-semibold text-gray-100 mb-2">Environment(s)</div>

  <input
    value={joinedEnvironments}
    on:input={handleEnvironmentsInput}
    class="appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none bg-transparent border-2 border-gray-700 focus:border-gray-600"
  />
  <div class="text-xs text-gray-500 mt-1">Comma-separated</div>
</div>
