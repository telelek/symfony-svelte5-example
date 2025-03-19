// This file demonstrates a TypeScript store for Svelte 5

export function createCounter() {
  let count = $state(0);

  function increment() {
    count++;
  }

  function decrement() {
    count--;
  }

  function reset() {
    count = 0;
  }

  return {
    get count() {
      return count;
    },
    increment,
    decrement,
    reset,
  };
}

export const counterStore = createCounter();
