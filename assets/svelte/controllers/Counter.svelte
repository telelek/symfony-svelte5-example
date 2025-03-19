<script lang="ts">
  import { counterStore } from "./store.svelte.ts";
  import Counter2 from "./Counter2.svelte";
  type Props = {
    name: string;
  };

  let { name }: Props = $props();
</script>

<div>Hello {name}</div>

<div>
  <h3>Counter 1</h3>
  <button onclick={() => counterStore.increment()}>+</button>
  <span>Count: {counterStore.count}!!</span>
  <button onclick={() => counterStore.decrement()}>-</button>
  <button onclick={() => counterStore.reset()}>Reset</button>
</div>

<Counter2 />
