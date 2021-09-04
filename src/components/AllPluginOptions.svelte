<script>
  import { createEventDispatcher } from 'svelte';

  export let allOptions = {};
  export let reloading = false;

  const dispatch = createEventDispatcher();

  const fetch = () => {
    dispatch('fetch');
  };
</script>

<div class="mt-4 pt-4 border-t border-gray-600">
  <div class="flex justify-between items-center mb-4">
    <div class="text-base font-semibold text-gray-100">All Plugin Options</div>
    <div
      class:animate-spin={reloading}
      class="text-gray-500 hover:text-gray-400 cursor-pointer rounded-full p-1.5 bg-gray-700 hover:bg-gray-600 "
      on:click={fetch}
      title="Refetch Options"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="redo-alt"
        class="h-3"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        ><path
          fill="currentColor"
          d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"
        /></svg
      >
    </div>
  </div>
  <div class="bg-gray-700 rounded p-2 text-indigo-200">
    <pre><code>{allOptions}</code></pre>
  </div>
</div>
