export function of<T>(...values: T[]) {
  return new Observable<T>((observer) => {
    for (const value of values) {
      observer.next(value);
    }
    observer.complete();

    // optional cleanup (nothing to clean here)
    return () => {};
  });
}

const obs = of(1, 2, 3);

obs.subscribe({
  next(value) {
    console.log("Value:", value);
  },
  complete() {
    console.log("Completed");
  },
});

export function from<T>(array: T[]) {
  return new Observable<T>((observer) => {
    try {
      for (const value of array) {
        observer.next(value);
      }
      observer.complete();
    } catch (err) {
      observer.error(err);
    }

    // optional cleanup
    return () => {};
  });
}







const obs = from([1, 2, 3]);

obs.subscribe({
  next(value) {
    console.log("Value:", value);
  },
  complete() {
    console.log("Completed");
  },
});



