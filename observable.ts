// Observable is a class that represents a stream of data that can be observed and manipulated using various operators. It is a core concept in reactive programming and is used extensively in libraries like RxJS.

export interface Observer<T> {
  next(value: T): void; // Whenever observable emits a new value, the next method is called with that value as an argument.
  error(err: any): void; // If an error occurs during the execution of the observable, the error method is called with the error as an argument.
  complete(): void; // When the observable has finished emitting all values, the complete method is called.
}

export type CleanupFunction = () => void; // A function that is returned by the executor and is responsible for cleaning up resources when the subscription is unsubscribed.

export type Executor<T> = (observer: Observer<T>) => CleanupFunction | void; // A function that takes an observer as an argument and is responsible for emitting values, handling errors, and signaling completion. It can also return a cleanup function that will be called when the subscription is unsubscribed.

export type Subscription = {
  unsubscribe(): void; // A subscription object that allows you to unsubscribe from the observable, stopping it from emitting further values.
};

/**
 * The Observable class is a fundamental part of reactive programming. It allows you to create and manage streams of data that can be observed and manipulated using various operators. The constructor takes an executor function that defines how the observable will emit values, handle errors, and signal completion. The subscribe method is used to start listening to the observable, and it returns a subscription object that can be used to unsubscribe when needed.
 */
export class Observable<T> {
  private executor: Executor<T>;

  /**
   * Constructor of the Observable class. It takes an executor function as an argument, which is responsible for defining how the observable will emit values, handle errors, and signal completion. The executor function is called when the subscribe method is invoked.
   * @param executor The executor function that defines how the observable will emit values, handle errors, and signal completion.
   */
  constructor(executor: Executor<T>) {
    this.executor = executor;
  }
  /**
   * subscribe method is used to start listening to the observable. It takes an observer object as an argument, which defines how to handle emitted values, errors, and completion signals. When subscribe is called, the executor function is executed with the provided observer, allowing it to emit values and manage the subscription lifecycle. The subscribe method returns a subscription object that can be used to unsubscribe from the observable when it's no longer needed.
   * @param observer The observer object that defines how to handle emitted values, errors, and completion signals.
   * @returns A subscription object that can be used to unsubscribe from the observable.
   */
  subscribe(observer: Observer<T>): Subscription {
    const cleanup = this.executor(observer);

    return {
      unsubscribe() {
        // Call the cleanup function if it exists when the subscription is unsubscribed. This allows for proper resource management and prevents memory leaks.
        if (cleanup) {
          cleanup();
        }
      },
    };
  }
}

