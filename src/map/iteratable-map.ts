export const map = <T, U>(f: (val: T) => U) => (iterable: Iterable<T>) =>
  iterableMap(f, iterable);

function* iterableMap<T, U>(
  f: (val: T) => U,
  iterable: Iterable<T>,
): Iterable<U> {
  for (const val of iterable) {
    yield f(val);
  }
}
