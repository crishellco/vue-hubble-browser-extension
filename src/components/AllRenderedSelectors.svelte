<script>
  export let selectors = [];
</script>

<div class="mt-4 pt-4 border-t border-gray-600">
  {#each selectors as selector}
    <div
      class="flex items-center bg-gray-700 rounded p-2 text-indigo-200 text-sm font-semibold font-mono"
    >
      <div>{selector.selector}</div>
    </div>
  {/each}
</div>
