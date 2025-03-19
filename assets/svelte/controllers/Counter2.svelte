<script lang="ts">
  import { counterStore } from "./store.svelte.ts";
</script>

<div>
  <h3>Counter 2</h3>
  <button onclick={() => counterStore.increment()}>+</button>
  <span>Count: {counterStore.count}!!</span>
</div>
