// Example usage of Observable

import { Observable } from './observable.js';

// const observable = new Observable<number>((observer) => {
//   console.log('Observable started');
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   observer.complete();
// });

// // executor is called when subscribe is invoked, and it receives an observer object that has the next, error, and complete methods. The executor can emit values using the next method, signal errors using the error method, and indicate completion using the complete method. In this example, the observable emits three values (1, 2, and 3) and then completes.
// observable.subscribe({
//   next(value) {
//     console.log('Received value:', value);
//   },
//   error(err) {
//     console.error('Error:', err);
//   },
//   complete() {
//     console.log('Observable completed');
//   },
// });

// observable.subscribe({
//   next(value) {
//     console.log('Received value:', value);
//   },
//   error(err) {
//     console.error('Error:', err);
//   },
//   complete() {
//     console.log('Observable completed');
//   },
// });

// const asyncObservable = new Observable<string>((observer) => {
//   console.log('Async Observable started');
//   setTimeout(() => {
//     observer.next('Hello');
//     observer.next('World');
//     observer.complete();
//   }, 5000);
// });

// asyncObservable.subscribe({
//   next(value) {
//     console.log('Received value:', value);
//   },
//   error(err) {
//     console.error('Error:', err);
//   },
//   complete() {
//     console.log('Async Observable completed');
//   },
// });

// asyncObservable.subscribe({
//   next(value) {
//     console.log('Received value observer1:', value);
//   },
//   error(err) {
//     console.error('Error observer1:', err);
//   },
//   complete() {
//     console.log('Async Observable completed observer1');
//   },
// });

const timerObservable = new Observable<number>((observer) => {
  console.log('Timer Observable started');
  let count = 0;
  const intervalId = setInterval(() => {
    observer.next(count++);
    console.log('generating value:', count);
  }, 1000);
  return () => clearInterval(intervalId); // Cleanup function to stop the interval when unsubscribed
});

const subscription = timerObservable.subscribe({
  next(value) {
    console.log('Received value:', value);
  },
  error(err) {
    console.error('Error:', err);
  },
  complete() {
    console.log('Timer Observable completed');
  },
});

setTimeout(() => {
  console.log('Unsubscribed from timer observable');
  subscription.unsubscribe();
}, 5000);

const fromObservable = from([10, 20, 30]);

fromObservable.subscribe({
  next(value) {
    console.log("from value:", value);
  },
  complete() {
    console.log("from completed");
  },
});
// Implement a function called as of(..) that will take a variable number of arguments and return an observable that emits those arguments sequentially and then completes. For example, of(1, 2, 3) should return an observable that emits 1, then 2, then 3, and then completes.

// Implement a function called from([...]) that takes an array of values and returns an observable that emits each value from the array sequentially and then completes. For example, from([1, 2, 3]) should return an observable that emits 1, then 2, then 3, and then completes.
