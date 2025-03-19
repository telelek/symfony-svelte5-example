<script lang="ts">
  //   import { counterStore } from "./store.svelte.ts";
  type Props = {
    name: string;
  };

  let { name }: Props = $props();
  let tstest1: "test1" | "test2" = "test1";
  console.log(tstest1);

  // Local counter just for demonstration
  export class Counter {
    count = $state(0);

    increment() {
      this.count++;
    }

    decrement() {
      this.count--;
    }

    reset() {
      this.count = 0;
    }
  }

  const counterStore = new Counter();
</script>

<div>Hello {name}</div>

<div class="counter-section">
  <h3>Using External Store</h3>
  <div>
    <button onclick={() => counterStore.increment()}>+</button>
    <span>Count: {counterStore.count}</span>
    <button onclick={() => counterStore.decrement()}>-</button>
    <button onclick={() => counterStore.reset()}>Reset</button>
  </div>
</div>

<p>{tstest1}</p>

<style>
  .counter-section {
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    margin: 0 0.25rem;
    padding: 0.25rem 0.5rem;
  }
</style>
