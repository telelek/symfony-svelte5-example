// // This file demonstrates a TypeScript store for Svelte 5
// // with full TypeScript support

// export class Counter {
//   count = $state(0);

//   increment() {
//     this.count++;
//   }

//   decrement() {
//     this.count--;
//   }

//   reset() {
//     this.count = 0;
//   }
// }

// // Export a singleton instance
// export const counterStore = new Counter();

// // You can also create additional typed stores
// export class UserStore<T> {
//   user = $state<T | null>(null);
//   loading = $state(false);
//   error = $state<string | null>(null);

//   setUser(user: T) {
//     this.user = user;
//     this.loading = false;
//     this.error = null;
//   }

//   clearUser() {
//     this.user = null;
//   }

//   setLoading(isLoading: boolean) {
//     this.loading = isLoading;
//   }

//   setError(error: string) {
//     this.error = error;
//     this.loading = false;
//   }
// }

// // Example of generic store usage
// type User = {
//   id: number;
//   name: string;
//   email: string;
// };

// export const userStore = new UserStore<User>();
